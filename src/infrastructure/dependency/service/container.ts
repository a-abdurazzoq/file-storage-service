import { ContainerModule } from "inversify";
import { ServiceSymbols } from "./symbol";
import { FileService, FileServiceImpl } from "../../../domain/file";
import { UserService, UserServiceImpl } from "../../../domain/user";
import { UserSessionService, UserSessionServiceImpl } from "../../../domain/user-session";
import { TokenService, TokenServiceImpl } from "../../token-service";

export const ServiceContainerModule = new ContainerModule(bind => {
	bind<FileService>(ServiceSymbols.File).to(FileServiceImpl).inSingletonScope()
	bind<TokenService>(ServiceSymbols.Token).to(TokenServiceImpl).inSingletonScope()
	bind<UserService>(ServiceSymbols.User).to(UserServiceImpl).inSingletonScope()
	bind<UserSessionService>(ServiceSymbols.UserSession).to(UserSessionServiceImpl).inSingletonScope()
})
