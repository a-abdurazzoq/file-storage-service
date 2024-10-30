import { ContainerModule } from "inversify";
import { FileStorageSymbols } from "./symbol"
import { FileStorage, LocalFileStorageImpl } from "../../file-storage";

export const FileStorageContainerModule = new ContainerModule(bind => {
	bind<FileStorage>(FileStorageSymbols.Local).to(LocalFileStorageImpl).inSingletonScope()
})
