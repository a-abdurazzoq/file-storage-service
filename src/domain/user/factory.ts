import { User } from "./entity";
import { injectable } from "inversify";

export interface UserFactory {
	create(params: UserStruct): User;
}

export type UserStruct = {
	id: number;
	password: string;
	createdAt: Date;
	updatedAt: Date;
}

@injectable()
export class UserFactoryImpl implements UserFactory {
    create(params: UserStruct): User {
        return new User(
	        params.id,
	        params.password,
	        params.createdAt,
	        params.updatedAt,
        )
    }

}
