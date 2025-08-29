import { BaseHttpController, controller, httpPost, request } from 'inversify-express-utils';
import { FileService } from '../services/file.service';
import { fileUploadMiddleware } from '@core/middleware/multer.middleware';
import { inject } from 'inversify';
import { TYPES } from '@core/types';
import { Request } from 'express';
import { AppResponse } from '@core/data/response/app.response';

@controller('/api/file')
export class FileController extends BaseHttpController {
	constructor(@inject(TYPES.FILE_SERVICE) private readonly fileService: FileService) {
		super();
	}

	@httpPost('/upload', fileUploadMiddleware)
	async uploadFile(@request() req: Request) {
		const files = req?.files as Express.Multer.File[];
		const file = await this.fileService.uploadFiles(files);
		return this.ok(AppResponse.success(file));
	}
}
