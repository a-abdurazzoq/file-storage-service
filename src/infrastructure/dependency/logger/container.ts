import { ContainerModule } from "inversify";
import { ConsoleLoggerImpl, Logger } from "../../logger";
import { LoggerSymbols } from "./symbol";

export const LoggerContainerModule = new ContainerModule(bind => {
	bind<Logger>(LoggerSymbols.Console).to(ConsoleLoggerImpl).inSingletonScope()
})
