export class FileException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'FileException';
	}

	static NotFoundById(fileId: number): FileException {
		return FileException.create(`File not found by id: ${fileId}`);
	}

	private static create(message: string): FileException {
		return new FileException(message);
	}
}
