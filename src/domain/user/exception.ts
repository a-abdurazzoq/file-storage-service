export class UserException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UserException';
	}

	static NotFoundById(userId: string): UserException {
		return UserException.create(`User not found by id: ${userId}`);
	}

	static OldPasswordInCorrect(): UserException {
		return UserException.create("Old password in correct");
	}

	private static create(message: string): UserException {
		return new UserException(message);
	}
}
