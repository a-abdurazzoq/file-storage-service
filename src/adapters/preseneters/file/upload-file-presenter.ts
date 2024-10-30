import { injectable } from "inversify";
import { FilePresenter, FilePresenterImpl } from "./file-presenter";

export interface UploadFilePresenter extends FilePresenter {}

@injectable()
export class UploadFilePresenterImpl extends FilePresenterImpl implements UploadFilePresenter {}
