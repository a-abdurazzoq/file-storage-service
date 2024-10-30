import { UserSession } from "./entity";
import { UserSessionStruct } from "./factory";

export interface UserSessionRepository {
	get(refreshToken: string): Promise<UserSession>;
	getByUserIdAndDeviceId(userId: number, deviceId: string): Promise<UserSession | null>;
	create(params: UserSessionStruct): Promise<UserSession>;
	update(refreshToken: string, newUserSession: UserSessionStruct): Promise<UserSession>;
	delete(refreshToken: string): Promise<void>;
}
