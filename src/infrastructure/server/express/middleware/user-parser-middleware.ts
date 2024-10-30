import {NextFunction, Request, Response} from "express";
import {Middleware} from "./middleware";
import { inject, injectable } from "inversify";
import { GetByAccessTokenUserSessionUsecaseImpl } from "../../../../application/usecases";
import { UsecaseSymbols } from "../../../dependency";

@injectable()
export class UserParserMiddleware implements Middleware {
    constructor(
        @inject(UsecaseSymbols.UserSession.GetByAccessToken)
        private readonly getByAccessTokenUserSessionUsecase: GetByAccessTokenUserSessionUsecaseImpl,
    ) {}

    public async execute(req: Request, res: Response, next: NextFunction) {
        try {
            const accessToken = req.tokens.access;
            if(!accessToken) {
                return next();
            }

            req.user = await this.getByAccessTokenUserSessionUsecase.execute({accessToken: accessToken});
            return next();
        } catch {
            next();
        }
    }
}
