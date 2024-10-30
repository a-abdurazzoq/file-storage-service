import { AbstractConfig } from "./abstract-config";
import { injectable } from "inversify";

export interface FileStorageConfig {
	getLocalStoragePath(): string;
}

@injectable()
export class FileStorageConfigImpl extends AbstractConfig implements FileStorageConfig {
	private readonly localStoragePath: string;

	constructor() {
		super();

		this.localStoragePath = process.env.FILE_STORAGE_PATH;

		this.validateEnvs();
	}

	public getLocalStoragePath(): string {
        return this.localStoragePath;
    }

	private validateEnvs(): void {
		if(!this.localStoragePath) {
			this.throwEnvError("FILE_STORAGE_PATH")
		}
	}
}
