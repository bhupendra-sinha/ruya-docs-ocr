import { TYPES } from '@core/types';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { OpenAIConfig } from '@core/openAI/openAI';
import { IOpenAiService } from '../interfaces/openAI.interface';

@injectable()
export class OpenAiService implements IOpenAiService {
	constructor(
		@inject(TYPES.LOGGER) private readonly logger: Logger,
		@inject(TYPES.OPENAI_CONFIG) private readonly openaiConfig: OpenAIConfig
	) {}

	async documentType(prompt: string) {
		const openai = await this.openaiConfig.getOpenAI();
		const completion = await openai.chat.completions.create({
			model: 'openai/gpt-4o',
			messages: [
				{
					role: 'user',
					content: prompt
				}
			]
		});

		this.logger.info(completion.choices[0].message);
		return completion.choices[0].message.content || '';
	}
}
