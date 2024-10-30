export class User {
	constructor(
		private readonly _id: number,
		private _password: string,
		private readonly _createdAt: Date,
		private readonly _updatedAt: Date,
	) {}

	public get id(): number {
		return this._id;
	}

	public get password(): string {
		return this._password;
	}

	public set password(password: string) {
		this._password = password;
	}

	public get createdAt(): Date {
		return this._createdAt;
	}

	public get updatedAt(): Date {
		return this._updatedAt;
	}
}
