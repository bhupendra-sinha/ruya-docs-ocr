export interface IEnhanceImageService {
	enhanceImage(imageBuffer: Buffer): Promise<Buffer>;
}
