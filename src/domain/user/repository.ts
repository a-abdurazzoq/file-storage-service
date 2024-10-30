import { User } from './entity';

export interface UserRepository {
	create(params: UserRepositoryCreateParams): Promise<User>;
	getById(userId: string): Promise<User>;
	updatePassword(userId: string, newPassword: string): Promise<void>;
}

export interface UserRepositoryCreateParams {
	id: string;
	password: string;
}
