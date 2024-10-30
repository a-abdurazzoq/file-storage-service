import { ContainerModule } from "inversify";
import { ConfigSymbols } from "./symbol";
import {
	FileStorageConfig,
	FileStorageConfigImpl,
	ServerConfig,
	ServerConfigImpl,
	UserConfig,
	UserConfigImpl
} from "../../../config";

export const ConfigContainerModule = new ContainerModule(bind => {
	bind<FileStorageConfig>(ConfigSymbols.FileStorage).to(FileStorageConfigImpl).inSingletonScope();
	bind<UserConfig>(ConfigSymbols.User).to(UserConfigImpl).inSingletonScope();
	bind<ServerConfig>(ConfigSymbols.Server).to(ServerConfigImpl).inSingletonScope();
})
