import { VerifyJwtMiddleware } from './verify-jwt.middleware';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { props } from '../../../config/props';
import { UserMetadataFixture } from '../models/fixtures/user-metadata.model.fixture';
import { UnauthorizedException } from '@nestjs/common';

describe('VerifyJwtMiddleware Unit Tests', () => {
  let middleware: VerifyJwtMiddleware;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const next = () => {};
  const requestWithToken = {
    headers: {
      authorization: sign(
        {
          usermetadata: UserMetadataFixture.newManager(),
        },
        props.auth.secret,
      ),
    },
  } as Request;
  const requestWithoutToken = {
    headers: { authorization: undefined },
  } as Request;

  beforeEach(() => {
    middleware = new VerifyJwtMiddleware();
  });

  describe('use', () => {
    it('should throw unauthorized exception when no token is provided', () => {
      let error;

      try {
        middleware.use(requestWithoutToken, {} as Response, next);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(UnauthorizedException);
    });

    it('should not throw any exception when given token is valid', () => {
      let error;

      try {
        middleware.use(requestWithToken, {} as Response, next);
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });
  });
});
