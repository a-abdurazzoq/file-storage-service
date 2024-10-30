import { ContainerModule } from "inversify";
import { UsecaseSymbols } from "./symbol";
import {
	DeleteFileUsecase,
	DeleteFileUsecaseImpl,
	DownloadFileUsecase,
	DownloadFileUsecaseImpl,
	GetAllFileUsecase,
	GetAllFileUsecaseImpl,
	GetInfoUserUsecase,
	GetInfoUserUsecaseImpl,
	GetOneFileUsecase,
	GetOneFileUsecaseImpl,
	LogoutUserUsecase,
	LogoutUserUsecaseImpl,
	SignInUserUsecase,
	SignInUserUsecaseImpl,
	SignUpUserUsecase,
	SignUpUserUsecaseImpl,
	UpdateFileUsecase,
	UpdateFileUsecaseImpl,
	UpdateUserSessionUsecase,
	UpdateUserSessionUsecaseImpl,
	UploadFileUsecase,
	UploadFileUsecaseImpl
} from "../../../application/usecases";

export const UsecaseContainerModule = new ContainerModule(bind => {
	bind<DeleteFileUsecase>(UsecaseSymbols.File.Delete).to(DeleteFileUsecaseImpl).inSingletonScope()
	bind<DownloadFileUsecase>(UsecaseSymbols.File.Download).to(DownloadFileUsecaseImpl).inSingletonScope()
	bind<GetAllFileUsecase>(UsecaseSymbols.File.GetAll).to(GetAllFileUsecaseImpl).inSingletonScope()
	bind<GetOneFileUsecase>(UsecaseSymbols.File.GetOne).to(GetOneFileUsecaseImpl).inSingletonScope()
	bind<UpdateFileUsecase>(UsecaseSymbols.File.Update).to(UpdateFileUsecaseImpl).inSingletonScope()
	bind<UploadFileUsecase>(UsecaseSymbols.File.Upload).to(UploadFileUsecaseImpl).inSingletonScope()
	bind<GetInfoUserUsecase>(UsecaseSymbols.User.GetInfo).to(GetInfoUserUsecaseImpl).inSingletonScope()
	bind<LogoutUserUsecase>(UsecaseSymbols.User.Logout).to(LogoutUserUsecaseImpl).inSingletonScope()
	bind<SignInUserUsecase>(UsecaseSymbols.User.SignIn).to(SignInUserUsecaseImpl).inSingletonScope()
	bind<SignUpUserUsecase>(UsecaseSymbols.User.SignUp).to(SignUpUserUsecaseImpl).inSingletonScope()
	bind<UpdateUserSessionUsecase>(UsecaseSymbols.UserSession.Update).to(UpdateUserSessionUsecaseImpl).inSingletonScope()
})
