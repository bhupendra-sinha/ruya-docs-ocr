import { ContainerModule } from 'inversify';
import { TYPES } from './types';
import { Logger } from 'winston';
import { ILogger } from './logger/logger.interface';
import { ConfigService } from './config/config';

const coreModule = new ContainerModule(bind => {
	bind<ILogger>(TYPES.LOGGER).to(Logger).inSingletonScope();
	bind<ConfigService>(TYPES.CONFIG).to(ConfigService).inSingletonScope();
});

export default coreModule;
