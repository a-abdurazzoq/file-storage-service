import { injectable } from "inversify";
import { FilePresenter, FilePresenterImpl } from "./file-presenter";
import { FileStruct } from "./types";
import { File } from "../../../domain/file";

export interface GetAllFilePresenter extends FilePresenter {
	presentAll(files: File[]): FileStruct[];
}

@injectable()
export class GetAllFilePresenterImpl extends FilePresenterImpl implements GetAllFilePresenter {
	public presentAll(files: File[]): FileStruct[] {
		return files.map(super.present)
	}
}
