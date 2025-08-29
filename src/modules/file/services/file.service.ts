import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { IFileService } from '../interfaces/file.interfaces';
import { IOcrService } from '../interfaces/ocr.interface';

@injectable()
export class FileService implements IFileService {
	constructor(
		@inject(TYPES.LOGGER) private readonly logger: Logger,
		@inject(TYPES.OCR_SERVICE) private readonly ocrService: IOcrService
	) {}

	async uploadFile(file: Express.Multer.File | undefined) {
		this.logger.info('uploading file');
		if (!file) {
			throw new Error(`File not found`);
		}

		const text = await this.ocrService.extractTextFromImage(file.buffer);
		this.logger.info('extracted text from image', text);

		return text;
	}
}
