import { inject, injectable } from "inversify";
import { User, UserService } from "../../../domain/user";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface GetInfoUserUsecase {
	execute(params: GetInfoUserUsecaseParams): Promise<User>;
}

export type GetInfoUserUsecaseParams = {
	userId: string;
};

@injectable()
export class GetInfoUserUsecaseImpl implements GetInfoUserUsecase {
	constructor(
		@inject(ServiceSymbols.User)
		private readonly userService: UserService,
	) {}

    public async execute(params: GetInfoUserUsecaseParams): Promise<User> {
        return this.userService.getById(params.userId);
    }
}
