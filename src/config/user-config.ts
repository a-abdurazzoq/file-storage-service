import { AbstractConfig } from "./abstract-config";
import { injectable } from "inversify";

export interface UserConfig {
	getPasswordSaltLength(): number;
	getJwtRefreshSecret(): string;
	getJwtAccessExpiration(): string;
	getJwtRefreshExpiration(): string;
}

@injectable()
export class UserConfigImpl extends AbstractConfig implements UserConfig {
	private readonly passwordSaltLength: number;
	private readonly jwtRefreshSecret: string;
	private readonly jwtAccessExpiration: string;
	private readonly jwtRefreshExpiration: string;

	constructor() {
		super();

		this.passwordSaltLength = Number(process.env.USER_PASSWORD_SALT_LENGTH || 0);
		this.jwtRefreshSecret = process.env.USER_JWT_REFRESH_SECRET;
		this.jwtAccessExpiration = process.env.USER_JWT_ACCESS_EXPIRATION;
		this.jwtRefreshExpiration = process.env.USER_JWT_REFRESH_EXPIRATION;

		this.validateEnvs();
	}
	public getPasswordSaltLength(): number {
		return this.passwordSaltLength;
	}

	public getJwtRefreshSecret(): string {
		return this.jwtRefreshSecret;
	}

    public getJwtAccessExpiration(): string {
        return this.jwtAccessExpiration;
    }

    public getJwtRefreshExpiration(): string {
        return this.jwtRefreshExpiration;
    }

	private validateEnvs(): void {
		if(!this.passwordSaltLength) {
			this.throwEnvError("USER_PASSWORD_SALT_LENGTH")
		}
		if(!this.jwtRefreshSecret) {
			this.throwEnvError("USER_JWT_REFRESH_SECRET")
		}
		if(!this.jwtAccessExpiration) {
			this.throwEnvError("USER_JWT_ACCESS_EXPIRATION")
		}
		if(!this.jwtRefreshExpiration) {
			this.throwEnvError("USER_JWT_REFRESH_EXPIRATION")
		}
	}
}
