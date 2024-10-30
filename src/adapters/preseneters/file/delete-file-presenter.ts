import { injectable } from "inversify";

export interface DeleteFilePresenter {
	present(): {};
}

@injectable()
export class DeleteFilePresenterImpl implements DeleteFilePresenter {
    public present(): {} {
        return {};
    }
}
