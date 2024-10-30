import { File } from './entity';

export interface FileRepository {
	create(params: FileRepositoryCreateParams): Promise<File>;
	getById(id: number): Promise<File>;
	getAllByUserId(userId: string, filter: FileRepositoryGetAllFileFilter): Promise<File[]>;
	deleteById(id: number): Promise<void>;
	updateById(id: number, updatedFile: File): Promise<File>;
}


export type FileRepositoryCreateParams = {
	filename: string;
	extension: string;
	mimeType: string;
	size: number
	userId: string;
}

export interface FileRepositoryGetAllFileFilter {
	page: number;
	limit: number;
}
