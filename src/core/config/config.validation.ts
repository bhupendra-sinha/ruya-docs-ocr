import { z } from 'zod';
import { config } from 'dotenv';

config();

export const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production', 'local']).default('development'),
	PORT: z.coerce.number().positive().default(8080),
	SERVER_URL: z.string().url().default('http://localhost:8080'),
	FE_APP_URL: z.string().default('http://localhost:5173'),
	SERVER_LOG_LEVEL: z.enum(['silly', 'debug', 'verbose', 'info', 'warn', 'error']).default('silly')
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
	console.error('❌ Invalid environment variables:', env.error.format());
	throw new Error('❌ Invalid environment variables');
}

export const validateEnv = env.data;
