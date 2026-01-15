import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExceptionPublicMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.includes('/public')) {
      // Eliminar cookies del request
      req.cookies = {};
      req.signedCookies = {};
      // Eliminar el header cookie si existe
      delete req.headers.cookie;
    }
    next();
  }
}
