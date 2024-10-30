export class UserSessionException extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'UserSessionException';
	}

	static NotFoundByRefreshToken(refreshToken: string): UserSessionException {
		return UserSessionException.create(`UserSession not found by refresh token: ${refreshToken}`);
	}

	static InvalidAccessToken(): UserSessionException {
		return new UserSessionException('Invalid access token');
	}

	static InvalidRefreshToken(): UserSessionException {
		return new UserSessionException('Invalid refresh token');
	}

	static ExpiredAccessToken(): UserSessionException {
		return new UserSessionException('Expired access token');
	}

	static ExpiredRefreshToken(): UserSessionException {
		return new UserSessionException('Expired refresh token');
	}

	private static create(message: string): UserSessionException {
		return new UserSessionException(message);
	}
}
