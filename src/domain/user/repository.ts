import { User } from './entity';

export interface UserRepository {
	create(params: UserRepositoryCreateParams): Promise<User>;
	getById(id: number): Promise<User>;
	updatePassword(id: number, newPassword: string): Promise<void>;
}

export interface UserRepositoryCreateParams {
	password: string;
}
