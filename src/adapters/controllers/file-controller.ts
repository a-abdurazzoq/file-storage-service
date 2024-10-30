import { inject, injectable } from "inversify";
import {
	DeleteFileUsecase,
	DeleteFileUsecaseParams, DownloadFileUsecase,
	DownloadFileUsecaseParams, GetAllFileUsecase,
	GetAllFileUsecaseParams, GetOneFileUsecase,
	GetOneFileUsecaseParams,
	UpdateFileUsecase,
	UpdateFileUsecaseParams, UploadFileUsecase,
	UploadFileUsecaseParams
} from "../../application/usecases";
import { NextFunction, Request, Response } from "express";
import {
	DeleteFilePresenter,
	GetAllFilePresenter,
	GetOneFilePresenter,
	UpdateFilePresenter,
	UploadFilePresenter
} from "../preseneters";
import { PresenterSymbols, UsecaseSymbols } from "../../infrastructure/dependency";

export type RequestBodyWithoutUserId<Params> = Request<any, any, Omit<Params, "userId">>;
export type RequestParamsWithoutUserId<Params> = Request<any, Omit<Params, "userId">>;

export interface FileController {
	delete(req: RequestParamsWithoutUserId<DeleteFileUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	download(req: RequestParamsWithoutUserId<DownloadFileUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	getAll(req: RequestBodyWithoutUserId<GetAllFileUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	getOne(req: RequestParamsWithoutUserId<GetOneFileUsecaseParams>, res: Response, next: NextFunction): Promise<void>;
	update(req: Request, res: Response, next: NextFunction): Promise<void>;
	upload(req: Request, res: Response, next: NextFunction): Promise<void>;
}

@injectable()
export class FileControllerImpl implements FileController {
	constructor(
		@inject(UsecaseSymbols.File.Delete)
		private readonly deleteFileUsecase: DeleteFileUsecase,
		@inject(UsecaseSymbols.File.Download)
		private readonly downloadFileUsecase: DownloadFileUsecase,
		@inject(UsecaseSymbols.File.GetAll)
		private readonly getAllFileUsecase: GetAllFileUsecase,
		@inject(UsecaseSymbols.File.GetOne)
		private readonly getOneFileUsecase: GetOneFileUsecase,
		@inject(UsecaseSymbols.File.Update)
		private readonly updateFileUsecase: UpdateFileUsecase,
		@inject(UsecaseSymbols.File.Upload)
		private readonly uploadFileUsecase: UploadFileUsecase,

		@inject(PresenterSymbols.File.Delete)
		private readonly deleteFilePresenter: DeleteFilePresenter,
		@inject(PresenterSymbols.File.GetAll)
		private readonly getAllFilePresenter: GetAllFilePresenter,
		@inject(PresenterSymbols.File.GetOne)
		private readonly getOneFilePresenter: GetOneFilePresenter,
		@inject(PresenterSymbols.File.Update)
		private readonly updateFilePresenter: UpdateFilePresenter,
		@inject(PresenterSymbols.File.Upload)
		private readonly uploadFilePresenter: UploadFilePresenter,
	) {}

	public async delete(req: RequestParamsWithoutUserId<DeleteFileUsecaseParams>, res: Response): Promise<void> {
		try {
			await this.deleteFileUsecase.execute({
				userId: req.user.userId,
				fileId: Number(req.params.fileId)
			});

			res.status(200).json({
				success: true,
				data: this.deleteFilePresenter.present(),
			})
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}

	public async download(req: RequestParamsWithoutUserId<DownloadFileUsecaseParams>, res: Response): Promise<void> {
		try {
			const filePath = await this.downloadFileUsecase.execute({
				userId: req.user.userId,
				fileId: Number(req.params.fileId),
			});

			res.download(filePath)
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}

	public async getAll(req: RequestBodyWithoutUserId<GetAllFileUsecaseParams>, res: Response): Promise<void> {
		try {
			const files = await this.getAllFileUsecase.execute({
				userId: req.user.userId,
				limit: req.body.limit,
				page: req.params.page,
			});


			res.status(200).json({
				success: true,
				data: this.getAllFilePresenter.presentAll(files),
			})
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}

	public async getOne(req: RequestParamsWithoutUserId<GetOneFileUsecaseParams>, res: Response): Promise<void> {
		try {
			const file = await this.getOneFileUsecase.execute({
				userId: req.user.userId,
				fileId: Number(req.params.fileId)
			});


			res.status(200).json({
				success: true,
				data: this.getOneFilePresenter.present(file),
			})
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}

	public async update(req: RequestParamsWithoutUserId<GetOneFileUsecaseParams>, res: Response): Promise<void> {
		try {
			const params = {
				userId: req.user.userId,
				fileId: Number(req.params.fileId),
				updatedData: {
					content: req.file?.buffer,
					mimeType: req.file?.mimetype,
					size: req.file?.size,
					filename: req.file?.originalname,
					extension: req.file?.originalname.split('.').pop()
				}
			} as UpdateFileUsecaseParams

			const file = await this.updateFileUsecase.execute(params)

			res.status(201).json({
				success: true,
				data: this.updateFilePresenter.present(file),
			})
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}

	public async upload(req: Request, res: Response): Promise<void> {
		try {
			const params = {
				userId: req.user.userId,
				content: req.file?.buffer,
				mimeType: req.file?.mimetype,
				size: req.file?.size,
				filename: req.file?.originalname,
				extension: req.file?.originalname.split('.').pop()
			} as UploadFileUsecaseParams;

			const file = await this.uploadFileUsecase.execute(params)

			res.status(200).json({
				success: true,
				data: this.uploadFilePresenter.present(file),
			})
		}
		// TODO сделать норм обработчик ошибки
		catch (e: any) {
			res.status(500).json({
				success: false,
				message: e.message
			})
		}
	}
}
