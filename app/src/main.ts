import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const host = '0.0.0.0';
  const port = process.env.PORT;

  await app.listen(port, host, () =>
    console.log(`Server running on localhost:${port}`),
  );
}
bootstrap();
