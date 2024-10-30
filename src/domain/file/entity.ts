export class File {
	constructor(
		private readonly _id: number,
		private readonly _userId: string,
		private _filename: string,
		private _extension: string,
		private _mimeType: string,
		private _size: number,
		private _uploadedDate: Date,
	) {}

	public get id(): number {
		return this._id;
	}

	public get userId(): string {
		return this._userId;
	}

	public get filename(): string {
		return this._filename;
	}

	public set filename(filename: string) {
		this._filename = filename;
	}

	public get extension(): string {
		return this._extension;
	}

	public set extension(extension: string) {
		this._extension = extension;
	}

	public get mimeType(): string {
		return this._mimeType;
	}

	public set mimeType(mimeType: string) {
		this._mimeType = mimeType;
	}

	public get size(): number {
		return this._size;
	}

	public set size(size: number) {
		this._size = size;
	}

	public get uploadedDate(): Date {
		return this._uploadedDate;
	}

	public set uploadedDate(uploadedDate: Date) {
		this._uploadedDate = uploadedDate;
	}
}
