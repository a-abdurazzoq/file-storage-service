import { inject, injectable } from "inversify";
import {
	UserSession,
	UserSessionException,
	UserSessionFactory,
	UserSessionRepository, UserSessionStruct,
} from "../../../../domain/user-session";
import { Database } from "../../database";
import { UserSession as UserSessionModel } from "@prisma/client";
import { DatabaseSymbols, FactorySymbols } from "../../../dependency";

@injectable()
export class UserSessionRepositoryImpl implements UserSessionRepository {
	constructor(
		@inject(DatabaseSymbols.MySql)
		private readonly database: Database,
		@inject(FactorySymbols.UserSession)
		private readonly factory: UserSessionFactory,
	) {}

	public async create(userSession: UserSessionStruct): Promise<UserSession> {
		const createdSession = await this.database.userSession.create({
			data: {
				userId: userSession.userId,
				deviceId: userSession.deviceId,
				refreshToken: userSession.refreshToken,
			}
		});

		return this.toEntity(createdSession);
	}

	public async get(refreshToken: string): Promise<UserSession> {
		const userSession = await this.database.userSession.findFirst({
			where: { refreshToken: refreshToken },
		});

		if (!userSession) {
			throw UserSessionException.NotFoundByRefreshToken(refreshToken);
		}

		return this.toEntity(userSession);
	}

	public async getByUserIdAndDeviceId(userId: number, deviceId: string): Promise<UserSession | null> {
		const userSession = await this.database.userSession.findFirst({
			where: {
				userId: userId,
				deviceId: deviceId,
			},
		});

		if (!userSession) {
			return null;
		}

		return this.toEntity(userSession);
	}

	public async update(refreshToken: string, newUserSession: UserSessionModel): Promise<UserSession> {
		const updatedSession = await this.database.userSession.update({
			where: { refreshToken },
			data: {
				userId: newUserSession.userId,
				deviceId: newUserSession.deviceId,
				refreshToken: newUserSession.refreshToken,
			},
		});

		return this.toEntity(updatedSession);
	}

	public async delete(refreshToken: string): Promise<void> {
		await this.database.userSession.delete({
			where: { refreshToken },
		});
	}

	private toEntity(model: UserSessionModel): UserSession {
		return this.factory.create({
			userId: model.userId,
			deviceId: model.deviceId,
			refreshToken: model.refreshToken,
		})
	}
}



