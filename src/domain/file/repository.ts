import { File } from './entity';

export interface FileRepository {
	create(params: FileRepositoryCreateParams): Promise<File>;
	getById(fileId: number): Promise<File>;
	getAllByUserId(userId: number, filter: FileRepositoryGetAllFileFilter): Promise<File[]>;
	deleteById(fileId: number): Promise<void>;
	updateById(fileId: number, updatedFile: File): Promise<File>;
}


export type FileRepositoryCreateParams = {
	filename: string;
	extension: string;
	mimeType: string;
	size: number
	userId: number;
}

export interface FileRepositoryGetAllFileFilter {
	page: number;
	limit: number;
}
