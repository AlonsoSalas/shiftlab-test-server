import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  private readonly logger = morgan(
    ':date[iso] - :method :url :status - :response-time ms',
  );

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
