import { inject, injectable } from "inversify";
import {
	File,
	FileException,
	FileFactory,
	FileRepository,
	FileRepositoryCreateParams,
	FileRepositoryGetAllFileFilter
} from "../../../../domain/file";
import { Database } from "../../database";
import { File as FileModel } from "@prisma/client";
import { DatabaseSymbols, FactorySymbols } from "../../../dependency";

@injectable()
export class FileRepositoryImpl implements FileRepository {
	constructor(
		@inject(DatabaseSymbols.MySql)
		private readonly database: Database,
		@inject(FactorySymbols.File)
		private readonly factory: FileFactory,
	) {}

	public async create(params: FileRepositoryCreateParams): Promise<File> {
		const file = await this.database.file.create({
			data: params
		});

		return this.toEntity(file);
	}

	public async updateById(id: number, changedFile: File): Promise<File> {
		const updatedFile = await this.database.file.update({
			where: { id },
			data: {
				filename: changedFile.filename,
				extension: changedFile.extension,
				mimeType: changedFile.mimeType,
				size: changedFile.size,
			},
		});

		return this.toEntity(updatedFile);
	}

	public async deleteById(fileId: number): Promise<void> {
		await this.database.file.delete({ where: { id: fileId } });
	}

	public async getById(fileId: number): Promise<File> {
		const file = await this.database.file.findFirst({ where: { id: fileId } });

		if(!file) {
			throw FileException.NotFoundById(fileId)
		}

		return this.toEntity(file);
	}

	public async getAllByUserId(userId: string, filter: FileRepositoryGetAllFileFilter): Promise<File[]> {
		const page = filter.page || 1;
		const limit = filter.limit || 10;
		const skip = (page - 1) * limit;

		const files = await this.database.file.findMany({
			where: { userId },
			skip: skip,
			take: limit,
			orderBy: { uploadedAt: 'desc' },
		});

		return this.toEntities(files);
	}

	private toEntities(models: FileModel[]): File[] {
		return models.map(model => this.toEntity(model));
	}

	private toEntity(model: FileModel): File {
		return this.factory.create({
			id: model.id,
			userId: model.userId,
			filename: model.filename,
			extension: model.extension,
			mimeType: model.mimeType,
			size: model.size,
			uploadedDate: model.uploadedAt,
		})
	}
}



