import { ContainerModule } from "inversify";
import { PresenterSymbols } from "./symbol";
import {
	DeleteFilePresenter,
	DeleteFilePresenterImpl,
	GetAllFilePresenter,
	GetAllFilePresenterImpl,
	GetInfoUserPresenter,
	GetInfoUserPresenterImpl,
	GetOneFilePresenter,
	GetOneFilePresenterImpl,
	LogoutUserPresenter,
	LogoutUserPresenterImpl,
	SignInUserPresenter,
	SignInUserPresenterImpl,
	SignUpUserPresenter,
	SignUpUserPresenterImpl,
	UpdateFilePresenter,
	UpdateFilePresenterImpl,
	UploadFilePresenter,
	UploadFilePresenterImpl,
	UpdateUserSessionPresenter,
	UpdateUserSessionPresenterImpl
} from "../../../adapters/preseneters";

export const PresenterContainerModule = new ContainerModule(bind => {
	bind<DeleteFilePresenter>(PresenterSymbols.File.Delete).to(DeleteFilePresenterImpl).inSingletonScope()
	bind<GetAllFilePresenter>(PresenterSymbols.File.GetAll).to(GetAllFilePresenterImpl).inSingletonScope()
	bind<GetOneFilePresenter>(PresenterSymbols.File.GetOne).to(GetOneFilePresenterImpl).inSingletonScope()
	bind<UpdateFilePresenter>(PresenterSymbols.File.Update).to(UpdateFilePresenterImpl).inSingletonScope()
	bind<UploadFilePresenter>(PresenterSymbols.File.Upload).to(UploadFilePresenterImpl).inSingletonScope()
	bind<GetInfoUserPresenter>(PresenterSymbols.User.GetInfo).to(GetInfoUserPresenterImpl).inSingletonScope()
	bind<LogoutUserPresenter>(PresenterSymbols.User.Logout).to(LogoutUserPresenterImpl).inSingletonScope()
	bind<SignInUserPresenter>(PresenterSymbols.User.SignIn).to(SignInUserPresenterImpl).inSingletonScope()
	bind<SignUpUserPresenter>(PresenterSymbols.User.SignUp).to(SignUpUserPresenterImpl).inSingletonScope()
	bind<UpdateUserSessionPresenter>(PresenterSymbols.UserSession.Update).to(UpdateUserSessionPresenterImpl).inSingletonScope()
})
