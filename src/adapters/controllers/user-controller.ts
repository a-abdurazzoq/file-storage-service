import { inject, injectable } from "inversify";
import {
	GetInfoUserUsecase,
	GetInfoUserUsecaseParams, LogoutUserUsecase, LogoutUserUsecaseParams, SignInUserUsecase,
	SignInUserUsecaseParams, SignUpUserUsecase, SignUpUserUsecaseParams, UpdateUserSessionUsecase,
	UpdateUserSessionUsecaseParams
} from "../../application/usecases";
import { PresenterSymbols, UsecaseSymbols } from "../../infrastructure/dependency";
import {
	GetInfoUserPresenter,
	SignInUserPresenter,
	SignUpUserPresenter,
	UpdateUserSessionPresenter
} from "../preseneters";
import { NextFunction, Request, Response } from "express";
import { UserSessionException } from "../../domain/user-session";

export interface UserController {
	info(req: Request<any, any, GetInfoUserUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	refreshAccessToken(req: Request<any, any, UpdateUserSessionUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	signIn(req: Request<any, any, SignInUserUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	signUp(req: Request<any, any, SignUpUserUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	logout(req: Request<any, any, LogoutUserUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class UserControllerImpl implements UserController {
	constructor(
		@inject(UsecaseSymbols.User.GetInfo)
		private readonly getInfoUserUsecase: GetInfoUserUsecase,
		@inject(UsecaseSymbols.UserSession.Update)
		private readonly updateUserSessionUsecase: UpdateUserSessionUsecase,
		@inject(UsecaseSymbols.User.SignIn)
		private readonly signInUserUsecase: SignInUserUsecase,
		@inject(UsecaseSymbols.User.SignUp)
		private readonly signUpUserUsecase: SignUpUserUsecase,
		@inject(UsecaseSymbols.User.Logout)
		private readonly logoutUserUsecase: LogoutUserUsecase,

		@inject(PresenterSymbols.User.GetInfo)
		private readonly getInfoUserPresenter: GetInfoUserPresenter,
		@inject(PresenterSymbols.UserSession.Update)
		private readonly updateUserSessionPresenter: UpdateUserSessionPresenter,
		@inject(PresenterSymbols.User.SignIn)
		private readonly signInUserPresenter: SignInUserPresenter,
		@inject(PresenterSymbols.User.SignUp)
		private readonly signUpUserPresenter: SignUpUserPresenter,
	) {}

	public async info(req: Request<any, any, GetInfoUserUsecaseParams>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.getInfoUserUsecase.execute({
			userId: req.user.userId
		});

		res.status(200).json({
			success: true,
			data: this.getInfoUserPresenter.present(user)
		});
	}

	public async refreshAccessToken(req: Request<any, any, UpdateUserSessionUsecaseParams>, res: Response, next: NextFunction): Promise<void> {
		const refreshToken = req.tokens.refresh;

		if(!refreshToken) {
			res.status(401).json({
				success: false,
				message: UserSessionException.InvalidRefreshToken().message,
			})
			return;
		}

		const pairTokens = await this.updateUserSessionUsecase.execute({
			refreshToken: refreshToken
		});

		res.status(200).json({
			success: true,
			data: this.updateUserSessionPresenter.present(pairTokens.accessToken, pairTokens.refreshToken)
		});
	}

	public async signIn(req: Request<any, any, SignInUserUsecaseParams>, res: Response, next: NextFunction): Promise<void> {
		const pairTokens = await this.signInUserUsecase.execute({
			userId: req.user.userId,
			inputPassword: req.body.inputPassword,
		});

		res.status(200).json({
			success: true,
			data: this.signInUserPresenter.present(pairTokens.accessToken, pairTokens.refreshToken)
		});
	}

	public async signUp(req: Request<any, any, SignUpUserUsecaseParams>, res: Response, next: NextFunction): Promise<void> {
		const pairTokens = await this.signUpUserUsecase.execute({
			id: req.body.id,
			password: req.body.password,
		});

		res.status(200).json({
			success: true,
			data: this.signUpUserPresenter.present(pairTokens.accessToken, pairTokens.refreshToken)
		});
	}

	public async logout(req: Request<any, any, LogoutUserUsecaseParams>, res: Response, next: NextFunction): Promise<void> {
		const refreshToken = req.tokens.refresh;

		if(!refreshToken) {
			res.status(401).json({
				success: false,
				message: UserSessionException.InvalidRefreshToken().message,
			})
			return;
		}

		await this.logoutUserUsecase.execute({
			refreshToken: refreshToken
		});

		res.status(200).json({
			success: true,
			data: {},
		});
	}
}
