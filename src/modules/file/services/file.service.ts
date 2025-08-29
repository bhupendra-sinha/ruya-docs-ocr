import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';

@injectable()
export class FileService {
	constructor(@inject(TYPES.LOGGER) private readonly logger: Logger) {}

	// async uploadFile(file: Express.Multer.File) {}
}
