import path from 'path';
import fs from 'fs/promises';
import { createHash } from 'crypto';
import { inject, injectable } from "inversify";
import { FileStorage } from "../file-storage";
import { FileStorageConfig } from "../../../config";
import { ConfigSymbols } from "../../dependency";

@injectable()
export class LocalFileStorageImpl implements FileStorage {
	constructor(
		@inject(ConfigSymbols.FileStorage)
		private readonly fileStorageConfig: FileStorageConfig,
	) {
		this.ensureFileStoragePath().then();
	}

	private async ensureFileStoragePath(): Promise<void> {
		try {
			await fs.access(this.fileStorageConfig.getLocalStoragePath());
		} catch {
			await fs.mkdir(this.fileStorageConfig.getLocalStoragePath(), { recursive: true });
		}
	}

	async saveFile(filename: string, content: Buffer): Promise<void> {
		const filepath = this.prepareFilePath(filename);
		await fs.writeFile(filepath, content);
	}

	async getFilePath(filename: string): Promise<string> {
		return path.join(this.fileStorageConfig.getLocalStoragePath(), filename);
	}

	async deleteFile(filename: string): Promise<void> {
		const filepath = this.prepareFilePath(filename);
		await fs.unlink(filepath);
	}

	async updateFile(filename: string, content: Buffer): Promise<void> {
		await this.saveFile(filename, content);
	}

	private prepareFilePath(filename: string): string {
		const hashedName = createHash('sha256').update(filename).digest('hex');
		return path.join(this.fileStorageConfig.getLocalStoragePath(), hashedName);
	}
}
