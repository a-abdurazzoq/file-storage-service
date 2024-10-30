import { inject, injectable } from "inversify";
import { UserSessionService } from "../../../domain/user-session";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface LogoutUserUsecase {
	execute(params: LogoutUserUsecaseParams): Promise<void>;
}

export type LogoutUserUsecaseParams = {
	refreshToken: string;
};

@injectable()
export class LogoutUserUsecaseImpl implements LogoutUserUsecase {
	constructor(
		@inject(ServiceSymbols.UserSession)
		private readonly userSessionService: UserSessionService,
	) {}

	public async execute(params: LogoutUserUsecaseParams): Promise<void> {
		return this.userSessionService.revokeSession(params.refreshToken);
	}
}
