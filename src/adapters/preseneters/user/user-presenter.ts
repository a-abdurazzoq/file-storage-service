import { injectable } from "inversify";
import { UserStruct } from "./types";
import { User } from "../../../domain/user";

export interface UserPresenter {
	present(user: User): UserStruct
}

@injectable()
export class UserPresenterImpl implements UserPresenter {
    public present(user: User): UserStruct {
        return {
			id: user.id,
	        createdAt: user.createdAt,
	        updatedAt: user.updatedAt,
        }
    }
}
