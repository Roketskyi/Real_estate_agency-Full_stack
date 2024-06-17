import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.use(cookieParser()); // Додати cookie-parser до middlewar
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();

  await app.listen(4000, '192.168.0.192');
}

bootstrap();