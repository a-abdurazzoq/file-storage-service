import { injectable } from "inversify";
import { PairTokenPresenter, PairTokenPresenterImpl } from "./pair-token-presenter";

export interface UpdateUserSessionPresenter extends PairTokenPresenter {}

@injectable()
export class UpdateUserSessionPresenterImpl extends PairTokenPresenterImpl implements UpdateUserSessionPresenter {}
