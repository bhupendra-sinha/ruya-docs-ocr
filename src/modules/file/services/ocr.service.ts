import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import * as tesseract from 'node-tesseract-ocr';
import { IOcrService } from '../interfaces/ocr.interface';

@injectable()
export class OcrService implements IOcrService {
	constructor(@inject(TYPES.LOGGER) private readonly logger: Logger) {}

	async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
		this.logger.info('extracting text from image');
		const config = {
			lang: 'eng',
			oem: 1,
			psm: 3
		};
		return await tesseract.recognize(imageBuffer, config);
	}
}
