import { inject, injectable } from "inversify";
import {
	UserSessionService,
	UserSessionServiceRefreshAccessTokenResult
} from "../../../domain/user-session";
import { UserService, UserServiceCreateParams } from "../../../domain/user";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface SignUpUserUsecase {
	execute(params: SignUpUserUsecaseParams): Promise<SignUpUserUsecaseResult>;
}

export type SignUpUserUsecaseParams = UserServiceCreateParams;
export type SignUpUserUsecaseResult = UserSessionServiceRefreshAccessTokenResult;

@injectable()
export class SignUpUserUsecaseImpl implements SignUpUserUsecase {
	constructor(
		@inject(ServiceSymbols.User)
		private readonly userService: UserService,
		@inject(ServiceSymbols.UserSession)
		private readonly userSessionService: UserSessionService,
	) {}

	public async execute(params: SignUpUserUsecaseParams): Promise<SignUpUserUsecaseResult> {
		const user = await this.userService.create(params);
		const userSession = await this.userSessionService.createSession(user);

		return this.userSessionService.refreshAccessToken(userSession.refreshToken);
	}
}
