export const PresenterSymbols = {
	File: {
		Delete: Symbol.for("DeleteAutomationPresenter"),
		GetAll: Symbol.for("GetAllAutomationPresenter"),
		GetOne: Symbol.for("GetOneAutomationPresenter"),
		Update: Symbol.for("UpdateAutomationPresenter"),
		Upload: Symbol.for("UploadAutomationPresenter"),
	},
	User: {
		GetInfo: Symbol.for("GetInfoUserPresenter"),
		Logout: Symbol.for("LogoutUserPresenter"),
		SignIn: Symbol.for("SignInUserPresenter"),
		SignUp: Symbol.for("SignUpUserPresenter"),
	},
	UserSession: {
		Update: Symbol.for("UpdateUserSessionPresenter"),
	},
}
