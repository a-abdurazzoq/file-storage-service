import { User } from './entity';
import { inject, injectable } from "inversify";
import { UserRepository } from "./repository";
import { compare, hash } from "bcryptjs";
import { UserException } from "./exception";
import { UserConfig } from "../../config";
import { ConfigSymbols, RepositorySymbols } from "../../infrastructure/dependency";

export interface UserService {
	create(params: UserServiceCreateParams): Promise<User>;
	getById(userId: number): Promise<User>;
	comparePassword(inputPassword: string, user: User): Promise<boolean>;
	updatePassword(params: UserServiceUpdatePasswordParams): Promise<void>;
}

export type UserServiceCreateParams = {
	password: string;
}

export type UserServiceUpdatePasswordParams = {
	id: number;
	oldPassword: string;
	newPassword: string;
}

@injectable()
export class UserServiceImpl implements UserService {
	constructor(
		@inject(RepositorySymbols.User)
		private readonly userRepository: UserRepository,
		@inject(ConfigSymbols.User)
		private readonly userConfig: UserConfig
	) {}


	public async create(params: UserServiceCreateParams): Promise<User> {
		const hashedPassword = await hash(params.password, this.userConfig.getPasswordSaltLength());

		return await this.userRepository.create({ password: hashedPassword });
	}

	public async getById(userId: number): Promise<User> {
		return this.userRepository.getById(userId);
	}

	public async comparePassword(inputPassword: string, user: User): Promise<boolean> {
		return compare(inputPassword, user.password);
	}

	public async updatePassword(params: UserServiceUpdatePasswordParams): Promise<void> {
		const user = await this.userRepository.getById(params.id);

		const isOldPasswordCorrect = await this.comparePassword(params.oldPassword, user);
		if (!isOldPasswordCorrect) {
			throw UserException.OldPasswordInCorrect();
		}

		const hashedNewPassword = await hash(params.newPassword, this.userConfig.getPasswordSaltLength());

		await this.userRepository.updatePassword(params.id, hashedNewPassword);
	}
}
