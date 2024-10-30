import { UserSession } from "../domain/user-session";

declare global {
	namespace Express {
		interface Request {
			user: UserSession;
			cookies: {
				"refresh-token": string;
			};
			tokens: {
				access: string | null;
				refresh: string | null;
			},
		}
	}
	namespace NodeJS {
		interface ProcessEnv {
			SERVER_HOST: string;
			SERVER_PORT: string;
			SERVER_CORS_ORIGIN: string;
			DATABASE_URL: string;
			USER_PASSWORD_SALT_LENGTH: string;
			USER_JWT_REFRESH_SECRET: string;
			USER_JWT_ACCESS_EXPIRATION: string;
			USER_JWT_REFRESH_EXPIRATION: string;
			FILE_STORAGE_PATH: string;
		}
	}

}
