export interface IOcrService {
	extractTextFromImage(imageBuffer: Buffer): Promise<string>;
}
