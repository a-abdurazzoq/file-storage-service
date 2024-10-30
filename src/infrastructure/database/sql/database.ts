import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import { LoggerSymbols } from "../../dependency";
import { Logger } from "../../logger";
import { Database } from "../database";

@injectable()
export class SqlDatabase implements Database {
	private readonly client: PrismaClient;

	constructor(
		@inject(LoggerSymbols.Console)
		private readonly logger: Logger,
	) {
		this.client = new PrismaClient();
	}

	public get file(): PrismaClient["file"] {
		return this.client.file;
	}

	public get user(): PrismaClient["user"] {
		return this.client.user;
	}

	public get userSession(): PrismaClient["userSession"] {
		return this.client.userSession;
	}

	public async connect(): Promise<void> {
		await this.client.$connect();
		void this.logger.print({
			title: "SqlDatabase",
			info: "Приложение успешно подключено к базе данных"
		})
	}

	public async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
