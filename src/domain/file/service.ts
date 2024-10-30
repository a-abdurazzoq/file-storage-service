import { inject, injectable } from "inversify";
import { FileRepository, FileRepositoryGetAllFileFilter } from "./repository";
import { File } from "./entity";
import { FileException } from "./exception";
import { FileStorageSymbols, RepositorySymbols } from "../../infrastructure/dependency";
import { FileStorage } from "../../infrastructure/file-storage";

export interface FileService {
	deleteFile(fileId: number, userId: number): Promise<void>;
	getFilePath(fileId: number, userId: number): Promise<string>;
	getAllFiles(userId: number, params: FileServiceGetAllParams): Promise<File[]>;
	getFileInfo(fileId: number, userId: number): Promise<File>;
	uploadFile(params: FileServiceUploadFileParams): Promise<File>;
	updateFile(params: FileServiceUpdateFileParams, updateData: FileServiceUpdateFileData): Promise<File>;
}

export type FileServiceGetAllParams = FileRepositoryGetAllFileFilter;

export type FileServiceUploadFileParams = {
	filename: string;
	content: Buffer;
	extension: string;
	mimeType: string;
	size: number
	userId: number;
}

export type FileServiceUpdateFileParams = {
	fileId: number
	userId: number;
}

export type FileServiceUpdateFileData = {
	filename: string;
	content: Buffer;
	extension: string;
	mimeType: string;
	size: number
}


@injectable()
export class FileServiceImpl implements FileService {
	constructor(
		@inject(RepositorySymbols.File)
		private fileRepository: FileRepository,
		@inject(FileStorageSymbols.Local)
		private fileStorage: FileStorage
	) {}

	public async uploadFile(params: FileServiceUploadFileParams): Promise<File> {
		const newFile = await this.fileRepository.create({
			filename: params.filename,
			extension: params.extension,
			mimeType: params.mimeType,
			size: params.size,
			userId: params.userId,
		});

		await this.fileStorage.saveFile(newFile.filename, params.content);

		return newFile;
	}

	public async updateFile(params: FileServiceUpdateFileParams, updatedData: FileServiceUpdateFileData): Promise<File> {
		const file = await this.getByIdAndUserId(params.fileId, params.userId)

		file.filename = updatedData.filename;
		file.extension = updatedData.extension;
		file.mimeType = updatedData.mimeType;
		file.size = updatedData.size;

		const updatedFile = await this.fileRepository.updateById(params.fileId, file);

		await this.fileStorage.updateFile(file.filename, updatedData.content);

		return updatedFile;
	}

	public async deleteFile(fileId: number, userId: number): Promise<void> {
		const file = await this.getByIdAndUserId(fileId, userId)

		await Promise.all([
			this.fileRepository.deleteById(fileId),
			this.fileStorage.deleteFile(file.filename),
		]);
	}

	public async getFileInfo(fileId: number, userId: number): Promise<File> {
		return await this.getByIdAndUserId(fileId, userId);
	}

	public async getFilePath(fileId: number, userId: number): Promise<string> {
		const file = await this.getByIdAndUserId(fileId, userId);

		return this.fileStorage.getFilePath(file.filename);
	}

	public async getAllFiles(userId: number, params: FileServiceGetAllParams): Promise<File[]> {
		return this.fileRepository.getAllByUserId(userId, params);
	}

	private async getByIdAndUserId(fileId: number, userId: number): Promise<File> {
		const file = await this.fileRepository.getById(fileId);

		if (file.userId !== userId) {
			FileException.NotFoundById(fileId);
		}

		return file;
	}
}
