import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('v1.0');

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
