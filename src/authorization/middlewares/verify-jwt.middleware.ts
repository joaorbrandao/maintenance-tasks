import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { props } from '../../../config/props';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class VerifyJwtMiddleware implements NestMiddleware {
  private readonly logger = new Logger(VerifyJwtMiddleware.name);

  use(request: Request, response: Response, next: NextFunction) {
    this.logger.debug(`Verifying given JWT`);

    const token = request.headers.authorization;
    if (!token) {
      throw new UnauthorizedException(
        `A JWT must be provided through the 'Authorization' header`,
      );
    }
    verify(token, props.auth.secret);
    next();
  }
}
