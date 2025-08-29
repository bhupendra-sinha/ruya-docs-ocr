import { ContainerModule } from 'inversify';
import { FileController } from './controllers/file.controller';
import { TYPES } from '@core/types';
import { FileService } from './services/file.service';
import { OcrService } from './services/ocr.service';
import { OpenAiService } from './services/openAi.service';
import { Pdf2ImageService } from './services/pdf2Image.service';

const fileModule = new ContainerModule(bind => {
	bind<FileController>(TYPES.FILE_CONTROLLER).to(FileController).inSingletonScope();
	bind<FileService>(TYPES.FILE_SERVICE).to(FileService).inSingletonScope();
	bind<OcrService>(TYPES.OCR_SERVICE).to(OcrService).inSingletonScope();
	bind<OpenAiService>(TYPES.OPENAI_SERVICE).to(OpenAiService).inSingletonScope();
	bind<Pdf2ImageService>(TYPES.PDF2IMAGE_SERVICE).to(Pdf2ImageService).inSingletonScope();
});

export default fileModule;
