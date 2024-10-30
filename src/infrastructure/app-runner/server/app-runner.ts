import { AppRunner } from "../app-runner";
import { Container, DatabaseSymbols, ServerSymbols } from "../../dependency";
import { Server } from "../../server";
import { Database } from "../../database/database";

export class ServerAppRunner implements AppRunner {
	constructor(
		private container: Container
	) {}

	public async run(): Promise<void> {
		const server = this.container.get<Server>(ServerSymbols.Express);
		const database = this.container.get<Database>(DatabaseSymbols.MySql);
		await server.start()
		await database.connect()
	}

	public async stop(): Promise<void> {
		const server = this.container.get<Server>(ServerSymbols.Express);
		const database = this.container.get<Database>(DatabaseSymbols.MySql);
		await server.stop()
		await database.disconnect()
	}
}
