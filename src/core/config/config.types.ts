import { z } from 'zod';
import { envSchema } from './config.validation';

export type ValidatedEnv = z.infer<typeof envSchema>;

export interface CorsConfig {
	origin: string[];
	methods: string[];
	allowedHeaders: string[];
	credentials: boolean;
	maxAge: number;
}

export interface ServerConfig {
	logLevel: string;
	port: number;
}

export interface OpenAIConfig {
	apiKey: string;
}
