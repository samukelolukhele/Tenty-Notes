declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_PORT?: number;
      POSTGRES_HOST?: string;
      POSTGRES_USER?: string;
      POSTGRES_PASSWORD?: string;
      POSTGRES_DATABASE: string;
      JWT_SECRET: string;
      SALT_ROUNDS: number;
    }
  }
}

export {};
