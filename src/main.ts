import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { ValidationPipe } from '@nestjs/common';
import express from 'express';

async function bootstrap() {
  const cookieParser = require('cookie-parser')
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser)

  // app.use('/files',express.static('files'))

  const PORT = env.PORT || 8080;
  await app.listen(PORT);

  console.log(`App is listening on: ${await app.getUrl()}`)
}
bootstrap();
