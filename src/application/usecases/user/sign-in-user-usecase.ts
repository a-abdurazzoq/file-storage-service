import { inject, injectable } from "inversify";
import {
	UserSessionService,
	UserSessionServiceRefreshAccessTokenResult
} from "../../../domain/user-session";
import { UserException, UserService } from "../../../domain/user";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface SignInUserUsecase {
	execute(params: SignInUserUsecaseParams): Promise<SignInUserUsecaseResult>;
}

export type SignInUserUsecaseParams = {
	userId: string;
	inputPassword: string;
};
export type SignInUserUsecaseResult = UserSessionServiceRefreshAccessTokenResult;

@injectable()
export class SignInUserUsecaseImpl implements SignInUserUsecase {
	constructor(
		@inject(ServiceSymbols.User)
		private readonly userService: UserService,
		@inject(ServiceSymbols.UserSession)
		private readonly userSessionService: UserSessionService,
	) {}

	public async execute(params: SignInUserUsecaseParams): Promise<SignInUserUsecaseResult> {
		const user = await this.userService.getById(params.userId);
		const isValidPassword = this.userService.comparePassword(params.inputPassword, user);

		if(!isValidPassword) {
			throw UserException.NotFoundById(user.id)
		}
		const userSession = await this.userSessionService.createSession(user);

		return this.userSessionService.refreshAccessToken(userSession.refreshToken);
	}
}
