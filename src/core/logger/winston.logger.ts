import { inject, injectable } from 'inversify';
import { ILogger } from './logger.interface';
import { createLogger, format, transports, Logger as WinstonLogger } from 'winston';
import { ConfigService } from '@core/config/config';
import { TYPES } from '@core/types';

@injectable()
export class Logger implements ILogger {
	private logger: WinstonLogger;

	constructor(@inject(TYPES.CONFIG) private config: ConfigService) {
		this.logger = createLogger({
			level: this.config.getServerConfig().logLevel,
			format: format.combine(format.timestamp(), format.json()),
			defaultMeta: { service: 'user-service' },
			transports: [
				new transports.Console({
					format: format.combine(format.colorize(), format.simple())
				})
			]
		});
	}

	debug(message: string, meta?: Record<string, any>) {
		this.logger.debug(message, meta);
	}

	error(message: string, meta?: Record<string, any>) {
		this.logger.error(message, meta);
	}

	warn(message: string, meta?: Record<string, any>) {
		this.logger.warn(message, meta);
	}

	info(message: string, meta?: Record<string, any>) {
		this.logger.info(message, meta);
	}
}
