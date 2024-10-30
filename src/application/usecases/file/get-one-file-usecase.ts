import { inject, injectable } from "inversify";
import { File, FileService } from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface GetOneFileUsecase {
	execute(params: GetOneFileUsecaseParams): Promise<File>;
}

export interface GetOneFileUsecaseParams {
	fileId: number;
	userId: string;
}

@injectable()
export class GetOneFileUsecaseImpl implements GetOneFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute(params: GetOneFileUsecaseParams): Promise<File> {
		return this.fileService.getFileInfo(params.fileId, params.userId);
	}
}
