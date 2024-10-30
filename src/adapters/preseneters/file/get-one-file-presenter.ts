import { injectable } from "inversify";
import { FilePresenter, FilePresenterImpl } from "./file-presenter";

export interface GetOneFilePresenter extends FilePresenter {}

@injectable()
export class GetOneFilePresenterImpl extends FilePresenterImpl implements GetOneFilePresenter {}
