import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import sharp from 'sharp';
import { IEnhanceImageService } from '../interfaces/enhaceImage.interface';

@injectable()
export class EnhanceImageService implements IEnhanceImageService {
	constructor(@inject(TYPES.LOGGER) private readonly logger: Logger) {}

	async enhanceImage(imageBuffer: Buffer): Promise<Buffer> {
		this.logger.info('enhancing image');
		return await sharp(imageBuffer).grayscale().normalize().sharpen().resize({ width: 2000 }).toBuffer();
	}
}
