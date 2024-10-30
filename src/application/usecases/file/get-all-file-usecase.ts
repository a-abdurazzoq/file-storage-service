import { inject, injectable } from "inversify";
import { File, FileService, FileServiceGetAllParams } from "../../../domain/file";
import { ServiceSymbols } from "../../../infrastructure/dependency";

export interface GetAllFileUsecase {
	execute(params: GetAllFileUsecaseParams): Promise<File[]>;
}

export type GetAllFileUsecaseParams = FileServiceGetAllParams & {
	userId: string;
}

@injectable()
export class GetAllFileUsecaseImpl implements GetAllFileUsecase {
	constructor(
		@inject(ServiceSymbols.File)
		private fileService: FileService,
	) {}

	public async execute({userId, ...filter}: GetAllFileUsecaseParams): Promise<File[]> {
		return this.fileService.getAllFiles(userId, filter);
	}
}
