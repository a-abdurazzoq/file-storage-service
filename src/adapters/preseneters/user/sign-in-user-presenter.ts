import { injectable } from "inversify";
import { PairTokenPresenter, PairTokenPresenterImpl } from "../user-session/pair-token-presenter";

export interface SignInUserPresenter extends PairTokenPresenter {}

@injectable()
export class SignInUserPresenterImpl extends PairTokenPresenterImpl implements SignInUserPresenter {}
