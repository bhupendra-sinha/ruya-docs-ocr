import { BaseHttpController, controller, httpPost, request } from 'inversify-express-utils';
import { FileService } from '../services/file.service';
import { fileUploadMiddleware } from '@core/middleware/multer.middleware';

@controller('/file')
export class FileController extends BaseHttpController {
	constructor(private readonly fileService: FileService) {
		super();
	}

	@httpPost('/upload', fileUploadMiddleware)
	async uploadFile(@request() req: Request) {
		console.log(req);
		// return this.fileService.uploadFile(req.file);
	}
}
