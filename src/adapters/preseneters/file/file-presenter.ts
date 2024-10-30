import { File } from "../../../domain/file";
import { FileStruct } from "./types";
import { injectable } from "inversify";

export interface FilePresenter {
	present(user: File): FileStruct;
}

@injectable()
export class FilePresenterImpl implements FilePresenter {
	public present(file: File): FileStruct {
		return {
			id: file.id,
			userId: file.userId,
			filename: file.filename,
			size: file.size,
			extension: file.extension,
			mimeType: file.mimeType,
			uploadedDate: file.uploadedDate,
		}
	}
}
