import { injectable } from "inversify";
import { FilePresenter, FilePresenterImpl } from "./file-presenter";

export interface UpdateFilePresenter extends FilePresenter {}

@injectable()
export class UpdateFilePresenterImpl extends FilePresenterImpl implements UpdateFilePresenter {}
