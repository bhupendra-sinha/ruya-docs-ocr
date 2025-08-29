import { FileDto } from '../data/response/file.dto';

export interface IFileService {
	uploadFiles(files: Express.Multer.File[] | undefined): Promise<FileDto[]>;
	getDocumentType(file: Express.Multer.File): Promise<FileDto>;
}
