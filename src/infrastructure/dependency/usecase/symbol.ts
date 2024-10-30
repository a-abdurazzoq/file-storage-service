export const UsecaseSymbols = {
	File: {
		Delete: Symbol.for("DeleteAutomationUsecase"),
		Download: Symbol.for("DownloadAutomationUsecase"),
		GetAll: Symbol.for("GetAllAutomationUsecase"),
		GetOne: Symbol.for("GetOneAutomationUsecase"),
		Update: Symbol.for("UpdateAutomationUsecase"),
		Upload: Symbol.for("UploadAutomationUsecase"),
	},
	User: {
		GetInfo: Symbol.for("GetInfoUserUsecase"),
		Logout: Symbol.for("LogoutUserUsecase"),
		SignIn: Symbol.for("SignInUserUsecase"),
		SignUp: Symbol.for("SignUpUserUsecase"),
	},
	UserSession: {
		Update: Symbol.for("UpdateUserSessionUsecase"),
	},
}
