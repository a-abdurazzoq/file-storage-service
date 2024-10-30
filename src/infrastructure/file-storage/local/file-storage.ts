import path from 'path';
import fs from 'fs/promises';
import * as crypto from "node:crypto";
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

	async saveFile(filename: string, content: Buffer): Promise<string> {
		const hashedFilename = this.hashFilename(filename)
		const filePath = this.prepareFilePath(hashedFilename);
		await fs.writeFile(filePath, content);

		return hashedFilename;
	}

	async getFilePath(filename: string): Promise<string> {
		return path.join(this.fileStorageConfig.getLocalStoragePath(), filename);
	}

	async deleteFile(filename: string): Promise<void> {
		const filepath = this.prepareFilePath(filename);
		await fs.unlink(filepath);
	}

	async updateFile(filename: string, content: Buffer): Promise<string> {
		return await this.saveFile(filename, content);
	}

	private prepareFilePath(filename: string): string {
		return path.join(this.fileStorageConfig.getLocalStoragePath(), filename);
	}

	private hashFilename(filename: string): string {
		const extension = filename.split('.').pop()
		const hashedName = createHash('sha256').update(filename).digest('hex');
		const uniqueId = this.randomUID();

		return `${hashedName}-${uniqueId}.${extension}`;
	}

	private randomUID(): string {
		return crypto.randomBytes(8).toString('hex');
	}
}
