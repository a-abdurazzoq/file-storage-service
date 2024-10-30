import { injectable } from "inversify";
import { User } from "../../../domain/user";

export interface LogoutUserPresenter {
	present(params: User): {};
}

@injectable()
export class LogoutUserPresenterImpl implements LogoutUserPresenter {
	public present(): {} {
		return {}
	}
}
