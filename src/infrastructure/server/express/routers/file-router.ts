import { Router } from "express";
import { inject, injectable } from "inversify";
import { RouterBase } from "./router";
import { ControllerSymbols, ServerSymbols } from "../../../dependency";
import { FileController } from "../../../../adapters/controllers";
import { Middleware } from "../middleware";
import multer from "multer";

@injectable()
export class FileRouterImpl implements RouterBase {
    private readonly multerUpload: multer.Multer;

    constructor(
        @inject(ServerSymbols.Middleware.AuthRequired)
        private readonly authRequiredMiddleware: Middleware,
        @inject(ControllerSymbols.File)
        private readonly fileController: FileController
    ) {
        this.multerUpload = multer({storage: multer.memoryStorage()})
    }

    public init(router: Router): void {
        router.use(
            "/file",
            this.authRequiredMiddleware.execute.bind(this.authRequiredMiddleware),
        );

        router.get(
            "/file/list",
            this.fileController.getAll.bind(this.fileController),
        );

        router.get(
            "/file/:fileId",
            this.fileController.getOne.bind(this.fileController),
        );

        router.get(
            "/file/download/:fileId",
            this.fileController.download.bind(this.fileController),
        );

        router.post(
            "/file/upload",
            this.multerUpload.single("file"),
            this.fileController.upload.bind(this.fileController),
        );

        router.put(
            "/file/update/:fileId",
            this.multerUpload.single("file"),
            this.fileController.update.bind(this.fileController),
        );

        router.delete(
            "/file/delete/:fileId",
            this.fileController.delete.bind(this.fileController),
        );

    }
}
