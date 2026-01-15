import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import cookieParser from 'cookie-parser';
import { Request, Response, NextFunction } from 'express';
import { ExceptionPublicMiddleware } from './middleware/exception-public/exception-public.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());

  // Middleware para eliminar cookies en rutas públicas
  const exceptionPublicMiddleware = new ExceptionPublicMiddleware();
  app.use((req: Request, res: Response, next: NextFunction) => {
    exceptionPublicMiddleware.use(req, res, next);
  });

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
