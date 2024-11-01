import {NextFunction, Request, Response} from "express";
import {Middleware} from "./middleware";
import {injectable} from "inversify";

@injectable()
export class TokenParserMiddleware implements Middleware {
    public execute(req: Request, res: Response, next: NextFunction) {
        try {
            const authorization = req.header("Authorization") || null;

            req.tokens = {
                access: authorization?.split(" ")[1] || null,
                refresh: req.cookies.refreshToken || null,
            }

            next()
        }
        catch {
            next()
        }
    }
}
