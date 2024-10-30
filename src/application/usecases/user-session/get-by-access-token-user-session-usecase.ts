import { inject, injectable } from "inversify";
import {
	UserSession,
	UserSessionService
} from "../../../domain/user-session";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface GetByAccessTokenUserSessionUsecase {
	execute(params: GetByAccessTokenUserSessionUsecaseParams): Promise<UserSession>;
}

export type GetByAccessTokenUserSessionUsecaseParams = {
	accessToken: string;
};

@injectable()
export class GetByAccessTokenUserSessionUsecaseImpl implements GetByAccessTokenUserSessionUsecase {
	constructor(
		@inject(ServiceSymbols.UserSession)
		private readonly userSessionService: UserSessionService,
	) {}

	public async execute(params: GetByAccessTokenUserSessionUsecaseParams): Promise<UserSession> {
		return this.userSessionService.checkAccessToken(params.accessToken);
	}
}
