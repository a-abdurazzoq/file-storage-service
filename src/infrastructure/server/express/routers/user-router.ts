import { Router } from "express";
import { inject, injectable } from "inversify";
import { RouterBase } from "./router";
import { ControllerSymbols, ServerSymbols } from "../../../dependency";
import { UserController } from "../../../../adapters/controllers";
import { Middleware } from "../middleware";


@injectable()
export class UserRouterImpl implements RouterBase {
    constructor(
        @inject(ServerSymbols.Middleware.AuthRequired)
        private readonly authRequiredMiddleware: Middleware,
        @inject(ControllerSymbols.User)
        private readonly userController: UserController
    ) {}

    public init(router: Router): void {
        router.post(
            "./signin",
            this.userController.signIn.bind(this.userController),
        );

        router.post(
            "./signin/new_token",
            this.authRequiredMiddleware.execute.bind(this.authRequiredMiddleware),
            this.userController.refreshAccessToken.bind(this.userController),
        );

        router.post(
            "./signup",
            this.userController.signUp.bind(this.userController),
        );

        router.get(
            "/info",
            this.authRequiredMiddleware.execute.bind(this.authRequiredMiddleware),
            this.userController.info.bind(this.userController),
        );

        router.get(
            "/logout",
            this.authRequiredMiddleware.execute.bind(this.authRequiredMiddleware),
            this.userController.logout.bind(this.userController),
        );
    }
}
