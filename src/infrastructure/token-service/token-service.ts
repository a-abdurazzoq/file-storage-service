import { JwtPayload } from "jsonwebtoken";

export interface TokenService {
	generateToken<Payload extends object>(payload: Payload, secret: string, expiresIn: string): string
	isValidToken(token: string, secret: string): boolean
	parseToken<Payload extends object>(token: string): Payload & JwtPayload | null;
}
