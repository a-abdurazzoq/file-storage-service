import { ContainerModule } from "inversify";
import { RepositorySymbols } from "./symbol";
import { FileRepository } from "../../../domain/file";
import { UserRepository } from "../../../domain/user";
import { UserSessionRepository } from "../../../domain/user-session";
import { FileRepositoryImpl, UserRepositoryImpl, UserSessionRepositoryImpl } from "../../database/sql/repositories";

export const RepositoryContainerModule = new ContainerModule(bind => {
	bind<FileRepository>(RepositorySymbols.File).to(FileRepositoryImpl).inSingletonScope()
	bind<UserRepository>(RepositorySymbols.User).to(UserRepositoryImpl).inSingletonScope()
	bind<UserSessionRepository>(RepositorySymbols.UserSession).to(UserSessionRepositoryImpl).inSingletonScope()
})
