import { ContainerModule } from "inversify";
import {
	AuthRequiredMiddleware,
	CookieParserMiddleware,
	CorsAllowMiddleware,
	ExpressServerImpl, Middleware, RouterBase,
	Server, TokenParserMiddleware, UserParserMiddleware, UserRouterImpl
} from "../../server";
import { ServerSymbols } from "./symbol";
import { FileRouterImpl } from "../../server/express/routers/file-router";

export const ServerContainerModule = new ContainerModule(bind => {
	bind<Server>(ServerSymbols.Express).to(ExpressServerImpl).inSingletonScope()
	bind<RouterBase>(ServerSymbols.Routers).to(FileRouterImpl).inSingletonScope()
	bind<RouterBase>(ServerSymbols.Routers).to(UserRouterImpl).inSingletonScope()
	bind<Middleware>(ServerSymbols.Middleware.AuthRequired).to(AuthRequiredMiddleware).inSingletonScope()
	bind<Middleware>(ServerSymbols.Middleware.CookieParser).to(CookieParserMiddleware).inSingletonScope()
	bind<Middleware>(ServerSymbols.Middleware.CorsAllow).to(CorsAllowMiddleware).inSingletonScope()
	bind<Middleware>(ServerSymbols.Middleware.TokenParser).to(TokenParserMiddleware).inSingletonScope()
	bind<Middleware>(ServerSymbols.Middleware.UserParser).to(UserParserMiddleware).inSingletonScope()
})
