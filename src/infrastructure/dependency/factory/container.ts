import { ContainerModule } from "inversify";
import { FactorySymbols } from "./symbol";
import { UserFactory, UserFactoryImpl } from "../../../domain/user";
import { FileFactory, FileFactoryImpl } from "../../../domain/file";
import { UserSessionFactory, UserSessionFactoryImpl } from "../../../domain/user-session";

export const FactoryContainerModule = new ContainerModule(bind => {
	bind<FileFactory>(FactorySymbols.File).to(FileFactoryImpl).inSingletonScope()
	bind<UserFactory>(FactorySymbols.User).to(UserFactoryImpl).inSingletonScope()
	bind<UserSessionFactory>(FactorySymbols.UserSession).to(UserSessionFactoryImpl).inSingletonScope()
})
