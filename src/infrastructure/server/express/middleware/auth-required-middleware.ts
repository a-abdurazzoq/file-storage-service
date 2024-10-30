import {NextFunction, Request, Response} from "express";
import {Middleware} from "./middleware";
import {injectable} from "inversify";

@injectable()
export class AuthRequiredMiddleware implements Middleware {
    public execute(req: Request, res: Response, next: NextFunction) {
        if(req.user) {
            return next();
        }

        res.status(401).send({
            success: false,
            message: "Not authorized",
        })
    }
}
