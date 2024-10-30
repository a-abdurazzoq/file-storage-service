export const ServerSymbols = {
	Express: Symbol.for("ExpressServer"),
	Routers: Symbol.for("Routers"),
	Middleware: {
		AuthRequired: Symbol.for("AuthRequiredMiddleware"),
		CookieParser: Symbol.for("CookieParserMiddleware"),
		CorsAllow: Symbol.for("CorsAllowMiddleware"),
		TokenParser: Symbol.for("TokenParserMiddleware"),
		UserParser: Symbol.for("UserParserMiddleware"),
	}
}
