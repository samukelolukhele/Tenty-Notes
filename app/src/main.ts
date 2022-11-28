import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import gcs_config from '../gcs_config';

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  fs.writeFile('./credentials.json', JSON.stringify(gcs_config), (err) => {
    if (err) {
      console.log(err);
    }
    console.log('File succesfully written!');
  });

  const host = '0.0.0.0';
  const port = process.env.PORT;

  await app.listen(port, host);
}
bootstrap();
