import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { AppResponse } from '../data/response/app.response';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '@core/types';

@injectable()
export class ErrorHandlerMiddleware {
	constructor(@inject(TYPES.LOGGER) private logger: ILogger) {}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	handle(err: Error, req: Request, res: Response, _next: NextFunction): void {
		const statusCode = (err as any).statusCode || 500;
		const errorCode = (err as any).code || 'INTERNAL_SERVER_ERROR';
		const errorMessage = err.message || 'Internal Server Error';

		this.logger.error(`Error: ${errorMessage}`, err);
		res.status(statusCode).json(AppResponse.error(errorCode, errorMessage));
	}
}
