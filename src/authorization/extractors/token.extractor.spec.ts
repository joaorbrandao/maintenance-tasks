import { UnauthorizedException } from '@nestjs/common';
import { props } from '../../../config/props';
import { JsonWebTokenError, sign } from 'jsonwebtoken';
import { UserMetadata } from '../models/user-metadata.model';
import { TokenExtractor } from './token.extractor';

describe('RequestExtractor Unit Tests', () => {
  describe('extractUserMetadata', () => {
    it('should throw unauthorized exception when no token is provided', () => {
      let error;

      try {
        TokenExtractor.extractUserMetadata(undefined);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(UnauthorizedException);
    });

    it('should throw exception when provided token is not valid', () => {
      let error;

      try {
        TokenExtractor.extractUserMetadata('invalid-token');
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(JsonWebTokenError);
    });

    it('should return user metadata for a valid token', () => {
      const validToken = sign(
        {
          usermetadata: {
            id: 1,
            type: 'MANAGER',
          },
        },
        props.auth.secret,
      );

      const actual = TokenExtractor.extractUserMetadata(validToken);
      expect(actual).toBeInstanceOf(UserMetadata);
    });
  });
});
