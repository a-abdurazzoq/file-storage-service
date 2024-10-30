import {NextFunction, Request, Response} from "express";
import {injectable} from "inversify";
import { Middleware } from "./middleware";

@injectable()
export class CookieParserMiddleware implements Middleware {
    public execute(req: Request, res: Response, next: NextFunction) {
        try {
            let cookies: string = req.headers.cookie || ""

            req.cookies = Object.fromEntries(cookies
                .split("; ")
                .map(cookie => cookie.split("="))
            )
            next()
        }
        catch {
            req.cookies = {};
            next()
        }

    }
}
