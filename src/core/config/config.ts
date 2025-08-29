import { injectable } from "inversify";

import { CorsConfig, ServerConfig, ValidatedEnv } from "./config.types";
import { validateEnv } from "./config.validation";

@injectable()
export class ConfigService {
  private readonly env: ValidatedEnv;

  constructor() {
    this.env = validateEnv;
  }

  getServerConfig(): ServerConfig {
    return {
      port: this.env.PORT,
      logLevel: this.env.SERVER_LOG_LEVEL,
    };
  }

  getCorsConfig(): CorsConfig {
    const allowedOrigins = [this.env.FE_APP_URL, this.env.SERVER_URL];

    return {
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Origin",
        "X-Requested-With",
        "Accept",
      ],
      credentials: true,
      maxAge: 3600,
    };
  }
}
