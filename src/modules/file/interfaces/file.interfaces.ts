export interface IFileService {
	uploadFile(file: Express.Multer.File | undefined): Promise<string>;
}
