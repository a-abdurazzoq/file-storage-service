import { inject, injectable } from "inversify";
import {
	User,
	UserException,
	UserFactory,
	UserRepository,
	UserRepositoryCreateParams,
} from "../../../../domain/user";
import { Database } from "../../database";
import { User as UserModel } from "@prisma/client";
import { DatabaseSymbols, FactorySymbols } from "../../../dependency";

@injectable()
export class UserRepositoryImpl implements UserRepository {
	constructor(
		@inject(DatabaseSymbols.MySql)
		private readonly database: Database,
		@inject(FactorySymbols.User)
		private readonly factory: UserFactory,
	) {}

	async create(params: UserRepositoryCreateParams): Promise<User> {
		const user = await this.database.user.create({
			data: {
				password: params.password,
			},
		});

		return this.toEntity(user);
	}

	async getById(userId: number): Promise<User> {
		const user = await this.database.user.findFirst({
			where: { id: userId },
		});

		if(!user) {
			throw UserException.NotFoundById(userId);
		}

		return this.toEntity(user);
	}

	async updatePassword(userId: number, newPassword: string): Promise<void> {
		await this.database.user.update({
			where: { id: userId },
			data: { password: newPassword, updatedAt: new Date() },
		});
	}

	private toEntity(model: UserModel): User {
		return this.factory.create({
			id: model.id,
			password: model.password,
			createdAt: model.createdAt,
			updatedAt: model.updatedAt,
		})
	}
}



