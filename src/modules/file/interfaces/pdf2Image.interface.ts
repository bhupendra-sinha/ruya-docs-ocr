export interface IPdf2ImageService {
	convertPdfToImage(pdfBuffer: Buffer): Promise<Buffer>;
}
