import http from "http";
import express, { Express, NextFunction, Request, Response } from "express"
import { inject, injectable, multiInject } from "inversify";
import { Server } from "../server";
import { Logger } from "../../logger";
import { ConfigSymbols, LoggerSymbols, ServerSymbols } from "../../dependency";
import { RouterBase } from "./routers";
import { Middleware } from "./middleware";
import { ServerConfig } from "../../../config";

@injectable()
export class ExpressServerImpl implements Server {
	private express: Express
	private server: http.Server

	constructor(
		@inject(LoggerSymbols.Console)
		private readonly logger: Logger,
		@inject(ConfigSymbols.Server)
		private readonly serverConfig: ServerConfig,
		@multiInject(ServerSymbols.Routers)
		private readonly routers: RouterBase[],
		@inject(ServerSymbols.Middleware.CookieParser)
		private readonly cookieParserMiddleware: Middleware,
		@inject(ServerSymbols.Middleware.CorsAllow)
		private readonly corsAllowMiddleware: Middleware,
		@inject(ServerSymbols.Middleware.TokenParser)
		private readonly tokenParserMiddleware: Middleware,
		@inject(ServerSymbols.Middleware.UserParser)
		private readonly userParserMiddleware: Middleware,
	) {}

	public async start(): Promise<void> {
		this.init();
	}

	public async stop(): Promise<void> {
		this.server.close(() => this.logger.print({
			title: "ExpressServer",
			alert: `Сервер на порте ${this.serverConfig.getPort()} отключено`}
		));
	}

	private init(): void {
		this.express = express();
		this.setMiddleware();
		this.setRouters();
		this.setListen();
	}

	private setMiddleware(): void {
		this.express.use((req: Request, res: Response, next: NextFunction) => this.corsAllowMiddleware.execute(req, res, next));
		this.express.use((req: Request, res: Response, next: NextFunction) => this.cookieParserMiddleware.execute(req, res, next));
		this.express.use((req: Request, res: Response, next: NextFunction) => this.tokenParserMiddleware.execute(req, res, next));
		this.express.use((req: Request, res: Response, next: NextFunction) => this.userParserMiddleware.execute(req, res, next));
		this.express.use(express.json({limit: '50mb'}))
	}

	private setRouters(): void {
		this.routers.forEach(router => router.init(this.express));
	}

	private setListen(): void {
		this.server = this.express.listen(
			this.serverConfig.getPort(),
			this.serverConfig.getHost(),
			() => this.logger.print({
				title: "ExpressServer",
				info: `Сервер работает по адресу http://${this.serverConfig.getHost()}:${this.serverConfig.getPort()}`
			})
		);
	}
}
