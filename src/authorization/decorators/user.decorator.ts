import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { TokenExtractor } from '../extractors/token.extractor';

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    return TokenExtractor.extractUserMetadata(request.headers.authorization);
  },
);
