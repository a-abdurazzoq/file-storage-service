import { inject, injectable } from "inversify";
import {
	UserSessionService,
	UserSessionServiceRefreshAccessTokenResult
} from "../../../domain/user-session";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface UpdateUserSessionUsecase {
	execute(params: UpdateUserSessionUsecaseParams): Promise<UpdateUserSessionUsecaseResult>;
}

export type UpdateUserSessionUsecaseParams = {
	refreshToken: string;
};

export type UpdateUserSessionUsecaseResult = UserSessionServiceRefreshAccessTokenResult;

@injectable()
export class UpdateUserSessionUsecaseImpl implements UpdateUserSessionUsecase {
	constructor(
		@inject(ServiceSymbols.UserSession)
		private readonly userSessionService: UserSessionService,
	) {}

	public async execute(params: UpdateUserSessionUsecaseParams): Promise<UpdateUserSessionUsecaseResult> {
		return this.userSessionService.refreshAccessToken(params.refreshToken);
	}
}
