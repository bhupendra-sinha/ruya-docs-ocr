import { BaseHttpController, controller, httpPost, request } from 'inversify-express-utils';
import { FileService } from '../services/file.service';
import { fileUploadMiddleware } from '@core/middleware/multer.middleware';
import { inject } from 'inversify';
import { TYPES } from '@core/types';

@controller('/file')
export class FileController extends BaseHttpController {
	constructor(@inject(TYPES.FILE_SERVICE) private readonly fileService: FileService) {
		super();
	}

	@httpPost('/upload', fileUploadMiddleware)
	async uploadFile(@request() req: Request) {
		console.log(req);
		// return this.fileService.uploadFile(req.file);
	}
}
