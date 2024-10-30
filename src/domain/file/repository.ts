import { File } from './entity';

export interface FileRepository {
	create(params: FileRepositoryCreateParams): Promise<File>;
	getById(id: number): Promise<File>;
	getAllByUserId(userId: number, filter: FileRepositoryGetAllFileFilter): Promise<File[]>;
	deleteById(id: number): Promise<void>;
	updateById(id: number, updatedFile: File): Promise<File>;
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
