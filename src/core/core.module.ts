import { ContainerModule } from 'inversify';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { ConfigService } from './config/config';
import { Logger } from './logger/winston.logger';
import { OpenAIConfig } from './openAI/openAI';

const coreModule = new ContainerModule(bind => {
	bind<ILogger>(TYPES.LOGGER).to(Logger).inSingletonScope();
	bind<ConfigService>(TYPES.CONFIG).to(ConfigService).inSingletonScope();
	bind<OpenAIConfig>(TYPES.OPENAI_CONFIG).to(OpenAIConfig).inSingletonScope();
});

export default coreModule;
