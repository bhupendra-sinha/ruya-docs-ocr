import { injectable } from 'inversify';

import { CorsConfig, OpenAIConfig, ServerConfig, ValidatedEnv } from './config.types';
import { validateEnv } from './config.validation';

@injectable()
export class ConfigService {
	private readonly env: ValidatedEnv;

	constructor() {
		this.env = validateEnv;
	}

	getServerConfig(): ServerConfig {
		return {
			port: this.env.PORT,
			logLevel: this.env.SERVER_LOG_LEVEL
		};
	}

	getOpenAIConfig(): OpenAIConfig {
		return {
			apiKey: this.env.API_KEY
		};
	}

	getCorsConfig(): CorsConfig {
		const allowedOrigins = ['http://localhost:5173', this.env.FE_APP_URL];

		return {
			origin: allowedOrigins,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
			credentials: true,
			maxAge: 3600
		};
	}
}
