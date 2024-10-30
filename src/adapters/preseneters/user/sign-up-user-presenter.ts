import { injectable } from "inversify";
import { PairTokenPresenter, PairTokenPresenterImpl } from "../user-session/pair-token-presenter";

export interface SignUpUserPresenter extends PairTokenPresenter {}

@injectable()
export class SignUpUserPresenterImpl extends PairTokenPresenterImpl implements SignUpUserPresenter {}
