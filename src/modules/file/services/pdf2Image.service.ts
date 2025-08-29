import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { fromBuffer } from 'pdf2pic';
import { IPdf2ImageService } from '../interfaces/pdf2Image.interface';

@injectable()
export class Pdf2ImageService implements IPdf2ImageService {
	constructor(@inject(TYPES.LOGGER) private readonly logger: Logger) {}

	async convertPdfToImage(pdfBuffer: Buffer) {
		this.logger.info('converting pdf to image');
		const converter = fromBuffer(pdfBuffer, {
			density: 300,
			format: 'jpg',
			height: 1000,
			width: 1000,
			quality: 1000,
			savePath: undefined
		});

		// INFO :- we can only fetch data from 1 page as of now !
		const result = await converter(1, { responseType: 'buffer' });

		if (!result.buffer) {
			this.logger.error('Failed to convert PDF to image');
			return Buffer.from('');
		}

		return result.buffer;
	}
}
