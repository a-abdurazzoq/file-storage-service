import { File } from "./entity";
import { injectable } from "inversify";

export interface FileFactory {
	create(params: FileStruct): File;
}

export type FileStruct = {
	id: number
	userId: number
	filename: string
	extension: string
	mimeType: string
	size: number
	uploadedDate: Date
}

@injectable()
export class FileFactoryImpl implements FileFactory {
    create(params: FileStruct): File {
        return new File(
			params.id,
			params.userId,
			params.filename,
			params.extension,
			params.mimeType,
			params.size,
			params.uploadedDate,
        )
    }

}
