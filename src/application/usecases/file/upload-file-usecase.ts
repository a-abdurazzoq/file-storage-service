import { inject, injectable } from "inversify";
import { File, FileService, FileServiceUploadFileParams } from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface UploadFileUsecase {
	execute(params: UploadFileUsecaseParams): Promise<File>;
}

export type UploadFileUsecaseParams = FileServiceUploadFileParams;

@injectable()
export class UploadFileUsecaseImpl implements UploadFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute(params: UploadFileUsecaseParams): Promise<File> {
		return this.fileService.uploadFile(params);
	}
}
