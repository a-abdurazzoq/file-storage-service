import { inject, injectable } from "inversify";
import { FileService } from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export type DeleteFileUsecaseParams = {
	fileId: number;
	userId: string;
}

export interface DeleteFileUsecase {
	execute(params: DeleteFileUsecaseParams): Promise<void>;
}

@injectable()
export class DeleteFileUsecaseImpl implements DeleteFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute(params: DeleteFileUsecaseParams): Promise<void> {
		return this.fileService.deleteFile(params.fileId, params.userId);
	}
}
