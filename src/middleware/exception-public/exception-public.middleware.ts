import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ExceptionPublicMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.path.includes('/public')) {
      req.cookies = {};
      req.headers = {};
    }
    next();
  }
}
