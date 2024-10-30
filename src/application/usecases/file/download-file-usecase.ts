import { inject, injectable } from "inversify";
import { FileService } from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface DownloadFileUsecase {
	execute(params: DownloadFileUsecaseParams): Promise<string>;
}

export type DownloadFileUsecaseParams = {
	fileId: number;
	userId: number;
}

@injectable()
export class DownloadFileUsecaseImpl implements DownloadFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute(params: DownloadFileUsecaseParams): Promise<string> {
		return this.fileService.getFilePath(params.fileId, params.userId);
	}
}
