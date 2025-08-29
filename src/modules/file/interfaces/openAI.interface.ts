export interface IOpenAiService {
	documentType(prompt: string): Promise<string>;
}
