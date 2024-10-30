import { inject, injectable } from "inversify";
import {
	File,
	FileService,
	FileServiceUpdateFileData,
	FileServiceUpdateFileParams,
} from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface UpdateFileUsecase {
	execute(params: UpdateFileUsecaseParams): Promise<File>;
}

export type UpdateFileUsecaseParams = FileServiceUpdateFileParams & {
	updatedData: FileServiceUpdateFileData
};

@injectable()
export class UpdateFileUsecaseImpl implements UpdateFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute({updatedData, ...params}: UpdateFileUsecaseParams): Promise<File> {
		return this.fileService.updateFile(params, updatedData);
	}
}
