import { injectable } from "inversify";
import { UserPresenter, UserPresenterImpl } from "./user-presenter";

export interface GetInfoUserPresenter extends UserPresenter {}

@injectable()
export class GetInfoUserPresenterImpl extends UserPresenterImpl implements GetInfoUserPresenter {}
