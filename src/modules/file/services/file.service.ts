import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { IFileService } from '../interfaces/file.interfaces';
import { IOcrService } from '../interfaces/ocr.interface';
import { IOpenAiService } from '../interfaces/openAI.interface';

@injectable()
export class FileService implements IFileService {
	constructor(
		@inject(TYPES.LOGGER) private readonly logger: Logger,
		@inject(TYPES.OCR_SERVICE) private readonly ocrService: IOcrService,
		@inject(TYPES.OPENAI_SERVICE) private readonly openAiService: IOpenAiService
	) {}

	async uploadFile(file: Express.Multer.File | undefined) {
		this.logger.info('uploading file');
		if (!file) {
			throw new Error(`File not found`);
		}

		const text = await this.ocrService.extractTextFromImage(file.buffer);

		if (!text || text.trim() === '') {
			throw new Error(`Text not found`);
		}

		const documentType = await this.openAiService.documentType(text);

		this.logger.info(`document type : ${documentType}`);

		return {
			documentType
		};
	}
}
