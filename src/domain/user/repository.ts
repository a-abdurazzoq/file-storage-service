import { User } from './entity';

export interface UserRepository {
	create(params: UserRepositoryCreateParams): Promise<User>;
	getById(userId: number): Promise<User>;
	updatePassword(userId: number, newPassword: string): Promise<void>;
}

export interface UserRepositoryCreateParams {
	id: string;
	password: string;
}
