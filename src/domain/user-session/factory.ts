import { UserSession } from "./entity";
import { injectable } from "inversify";

export interface UserSessionFactory {
	create(params: UserSessionStruct): UserSession;
}

export type UserSessionStruct = {
	userId: number;
	deviceId: string;
	refreshToken: string;
}

@injectable()
export class UserSessionFactoryImpl implements UserSessionFactory {
    create(params: UserSessionStruct): UserSession {
        return new UserSession(
	        params.userId,
	        params.deviceId,
	        params.refreshToken,
        )
    }

}
