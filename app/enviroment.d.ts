declare global {
  namespace NodeJS {
    interface ProcessEnv {
      POSTGRES_PORT: number;
      POSTGRES_HOST: string;
      POSTGRES_USER: string;
      POSTGRES_PASSWORD: string;
      POSTGRES_DATABASE: string;
      GCS_BUCKET: string;
      GCS_PROJECT: string;
      GCS_CLIENT_EMAIL: string;
      GCS_PRIVATE_KEY: string;
      JWT_SECRET: string;
      SALT_ROUNDS: number;
      CLIENT_URL: string;
      PORT: number;
    }
  }
}

export {};
