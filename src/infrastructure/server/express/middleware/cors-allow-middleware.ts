import {NextFunction, Request, Response} from "express";
import {Middleware} from "./middleware";
import { inject, injectable } from "inversify";
import { ServerConfig } from "../../../../config";
import { ConfigSymbols } from "../../../dependency";

@injectable()
export class CorsAllowMiddleware implements Middleware {
    constructor(
        @inject(ConfigSymbols.Server)
        private readonly serverConfig: ServerConfig
    ) {}

    public execute(req: Request, res: Response, next: NextFunction) {
        const corsAllowOrigin = this.serverConfig.getCorsAllowOrigin() === "*"
            ? String(req.headers.origin)
            : this.serverConfig.getCorsAllowOrigin();

        res.header("Access-Control-Allow-Origin", corsAllowOrigin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
    }
}
