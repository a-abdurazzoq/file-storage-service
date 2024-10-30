import { ContainerModule } from "inversify";
import { FileController, FileControllerImpl, UserController, UserControllerImpl } from "../../../adapters/controllers";
import { ControllerSymbols } from "./symbol";

export const ControllerContainerModule = new ContainerModule(bind => {
	bind<FileController>(ControllerSymbols.File).to(FileControllerImpl).inSingletonScope();
	bind<UserController>(ControllerSymbols.User).to(UserControllerImpl).inSingletonScope();
})
