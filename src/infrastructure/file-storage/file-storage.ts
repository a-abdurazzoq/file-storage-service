export interface FileStorage {
	saveFile(filename: string, content: Buffer): Promise<void>;
	getFilePath(filename: string): Promise<string>;
	deleteFile(filename: string): Promise<void>;
	updateFile(filename: string, content: Buffer): Promise<void>;
}
