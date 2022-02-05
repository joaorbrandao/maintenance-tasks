import { Request } from 'express';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { TokenExtractor } from '../extractors/token.extractor';

@Injectable()
export class UserTypeGuard implements CanActivate {
  private readonly logger = new Logger(UserTypeGuard.name);
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    this.logger.debug(`Verifying that the current user can access resource`);
    const resourceAllowedUserTypes = this.reflector.get<string[]>(
      'userTypes',
      context.getHandler(),
    );

    const request = context.switchToHttp().getRequest<Request>();

    if (!resourceAllowedUserTypes || resourceAllowedUserTypes.length == 0) {
      // No validation is being done, so let it pass.
      this.logger.warn(`Resource '${request.url}' is public`);
      return true;
    }

    const currentUserMetadata = TokenExtractor.extractUserMetadata(
      request.headers.authorization,
    );

    this.logger.debug(
      `Validating current user type '${currentUserMetadata.type}' to access resource '${request.url}'`,
    );

    if (!resourceAllowedUserTypes.includes(currentUserMetadata.type)) {
      throw new ForbiddenException(
        `Resource not allowed for user type '${currentUserMetadata.type}'`,
      );
    }

    return true;
  }
}
