import { ContainerModule } from 'inversify';
import { FileController } from './controllers/file.controller';
import { TYPES } from '@core/types';
import { FileService } from './services/file.service';

const fileModule = new ContainerModule(bind => {
	bind<FileController>(TYPES.FILE_CONTROLLER).to(FileController).inSingletonScope();
	bind<FileService>(TYPES.FILE_SERVICE).to(FileService).inSingletonScope();
});

export default fileModule;
