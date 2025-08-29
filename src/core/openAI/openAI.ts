import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import OpenAI from 'openai';
import { ConfigService } from '@core/config/config';

@injectable()
export class OpenAIConfig {
	constructor(
		@inject(TYPES.LOGGER) private readonly logger: Logger,
		@inject(TYPES.CONFIG) private readonly config: ConfigService
	) {}

	async getOpenAI() {
		this.logger.info('initializing openai');
		const openai = new OpenAI({
			baseURL: 'https://openrouter.ai/api/v1',
			apiKey: this.config.getOpenAIConfig().apiKey
		});

		return openai;
	}
}
