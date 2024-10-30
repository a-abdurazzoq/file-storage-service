import { UserSession } from "./entity";
import { User } from "../user";
import { inject, injectable } from "inversify";
import { UserSessionRepository } from "./repository";
import { TokenService } from "../../infrastructure/token-service";
import { UserConfig } from "../../config";
import { UserSessionException } from "./exception";
import { UserSessionStruct } from "./factory";
import { ConfigSymbols, RepositorySymbols, ServiceSymbols } from "../../infrastructure/dependency";

export interface UserSessionService {
	createSession(user: User): Promise<UserSession>;
	refreshAccessToken(refreshToken: string): Promise<UserSessionServiceRefreshAccessTokenResult>;
	checkAccessToken(accessToken: string): Promise<UserSession>;
	revokeSession(refreshToken: string): Promise<void>;
}

export type UserSessionServiceRefreshAccessTokenResult = {
	accessToken: string;
	refreshToken: string;
}

@injectable()
export class UserSessionServiceImpl implements UserSessionService {
	constructor(
		@inject(RepositorySymbols.UserSession)
		private userSessionRepository: UserSessionRepository,
		@inject(ServiceSymbols.Token)
		private tokenService: TokenService,
		@inject(ConfigSymbols.User)
		private userConfig: UserConfig,
	) {}

	public async createSession(user: User): Promise<UserSession> {
		const deviceId = this.generateDeviceId();

		const refreshToken = this.tokenService.generateToken(
			{
				userId: user.id,
				deviceId: deviceId,
			},
			this.userConfig.getJwtRefreshSecret(),
			this.userConfig.getJwtRefreshExpiration()
		);

		return this.userSessionRepository.create({
			userId: user.id,
			deviceId: deviceId,
			refreshToken,
		});
	}

	public async checkAccessToken(accessToken: string): Promise<UserSession> {
		const payloadToken = this.tokenService.parseToken<Omit<UserSessionStruct, "refreshToken">>(accessToken);

		if(!payloadToken) {
			throw UserSessionException.InvalidAccessToken();
		}

		if (!payloadToken.exp || Date.now() >= payloadToken.exp * 1000) {
			throw UserSessionException.ExpiredAccessToken();
		}

		const userSession = await this.userSessionRepository.getByUserIdAndDeviceId(payloadToken.userId, payloadToken.deviceId);

		if(!userSession) {
			throw UserSessionException.InvalidAccessToken();
		}

		if(!this.tokenService.isValidToken(accessToken, userSession.refreshToken)) {
			throw UserSessionException.InvalidAccessToken();
		}

		return userSession;
	}

	public async refreshAccessToken(refreshToken: string): Promise<UserSessionServiceRefreshAccessTokenResult> {
		const session = await this.userSessionRepository.get(refreshToken);

		if (!session) {
			throw UserSessionException.InvalidRefreshToken();
		}

		const isValidRefreshToken = this.tokenService.isValidToken(refreshToken, this.userConfig.getJwtRefreshSecret());
		if (!isValidRefreshToken) {
			await this.userSessionRepository.delete(session.refreshToken);
			throw UserSessionException.ExpiredRefreshToken();
		}

		const newAccessToken = this.tokenService.generateToken<Omit<UserSessionStruct, "refreshToken">>(
			{
				userId: session.userId,
				deviceId: session.deviceId,
			},
			session.refreshToken,
			this.userConfig.getJwtAccessExpiration()
		);

		return {
			accessToken: newAccessToken,
			refreshToken: session.refreshToken,
		};
	}

	public async revokeSession(refreshToken: string): Promise<void> {
		await this.userSessionRepository.delete(refreshToken);
	}

	private generateDeviceId(): string {
		return crypto.randomUUID();
	}
}
