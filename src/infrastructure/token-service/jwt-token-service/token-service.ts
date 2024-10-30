import jwt, { JwtPayload } from 'jsonwebtoken';
import { injectable } from "inversify";
import { TokenService } from "../token-service";

@injectable()
export class TokenServiceImpl implements TokenService {
	public generateToken<Payload extends object>(payload: Payload, secret: string, expiresIn: string): string {
		return jwt.sign(payload, secret, { expiresIn: expiresIn });
	}

	public isValidToken(token: string, secret: string): boolean {
		try {
			return Boolean(jwt.verify(token, secret));
		} catch {
			return false;
		}
	}

	public parseToken<Payload extends object>(token: string): Payload & JwtPayload | null {
		return jwt.decode(token, {json: true}) as Payload & JwtPayload;
	}
}
