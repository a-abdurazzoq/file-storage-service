import { AbstractConfig } from "./abstract-config";
import { injectable } from "inversify";

export interface ServerConfig {
	getHost(): string;
	getPort(): number;
	getCorsAllowOrigin(): string;
}

@injectable()
export class ServerConfigImpl extends AbstractConfig implements ServerConfig {
	private readonly host: string;
	private readonly port: number;
	private readonly corsAllowOrigin: string;

	constructor() {
		super();

		this.host = process.env.SERVER_HOST;
		this.port = Number(process.env.SERVER_PORT || null);
		this.corsAllowOrigin = process.env.SERVER_CORS_ORIGIN;

		this.validateEnvs();
	}

    public getHost(): string {
        return this.host;
    }

	public getPort(): number {
		return this.port;
	}

	public getCorsAllowOrigin(): string {
		return this.corsAllowOrigin;
	}

	private validateEnvs(): void {
		if(!this.host) {
			this.throwEnvError("SERVER_HOST")
		}
		if(!this.port) {
			this.throwEnvError("SERVER_PORT")
		}
		if(!this.corsAllowOrigin) {
			this.throwEnvError("SERVER_CORS_ORIGIN")
		}
	}
}
