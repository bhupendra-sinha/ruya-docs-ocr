import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { IFileService } from '../interfaces/file.interface';
import { IOcrService } from '../interfaces/ocr.interface';
import { IOpenAiService } from '../interfaces/openAI.interface';
import { IPdf2ImageService } from '../interfaces/pdf2Image.interface';
import { IEnhanceImageService } from '../interfaces/enhaceImage.interface';
import { FileDto } from '../data/response/file.dto';

@injectable()
export class FileService implements IFileService {
	constructor(
		@inject(TYPES.LOGGER) private readonly logger: Logger,
		@inject(TYPES.OCR_SERVICE) private readonly ocrService: IOcrService,
		@inject(TYPES.OPENAI_SERVICE) private readonly openAiService: IOpenAiService,
		@inject(TYPES.PDF2IMAGE_SERVICE) private readonly pdf2ImageService: IPdf2ImageService,
		@inject(TYPES.ENHANCE_IMAGE_SERVICE) private readonly enhanceImageService: IEnhanceImageService
	) {}

	async uploadFiles(files: Express.Multer.File[] | undefined): Promise<FileDto[]> {
		this.logger.info('uploading file');
		if (!files) {
			throw new Error(`File not found`);
		}

		const responseString: FileDto[] = [];

		for (const file of files) {
			responseString.push(await this.getDocumentType(file));
		}

		return responseString;
	}

	async getDocumentType(file: Express.Multer.File): Promise<FileDto> {
		let imageBuffer: Buffer;
		if (!file.mimetype.startsWith('image') && file.mimetype === 'application/pdf') {
			// INFO :- we should direct extract text from pdf -> will do in enhancement
			imageBuffer = await this.pdf2ImageService.convertPdfToImage(file.buffer);
		} else {
			imageBuffer = file.buffer;
		}

		const finalImageBuffer = await this.enhanceImageService.enhanceImage(imageBuffer);

		const text = await this.ocrService.extractTextFromImage(finalImageBuffer);

		if (!text || text.trim() === '') {
			throw new Error(`Text not found`);
		}

		const documentType = await this.openAiService.documentType(text);

		this.logger.info(`document type : ${documentType}`);

		return {
			fileName: file.originalname,
			documentType
		};
	}
}
