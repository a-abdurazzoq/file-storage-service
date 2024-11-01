export class UserSession {
	constructor(
		private readonly _userId: string,
		private readonly _deviceId: string,
		private readonly _refreshToken: string,
	) {}

	public get userId(): string {
		return this._userId;
	}

	public get deviceId(): string {
		return this._deviceId;
	}

	public get refreshToken(): string {
		return this._refreshToken;
	}
}
