import { AppResponse } from '@core/data/response/app.response';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export function fileUploadMiddleware(req: Request, res: Response, next: NextFunction) {
	upload.array('files')(req, res, err => {
		if (err) {
			return res.status(400).json(AppResponse.error('FILE_UPLOAD_ERROR', err.message));
		}

		if (!req.files || req.files.length === 0) {
			return res.status(400).json(AppResponse.error('FILE_UPLOAD_ERROR', 'No file uploaded!'));
		}

		next();
	});
}
