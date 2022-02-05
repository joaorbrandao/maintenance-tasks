import { UserTypeGuard } from './user-type.guard';
import { mock, MockProxy } from 'jest-mock-extended';
import { Reflector } from '@nestjs/core';
import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request } from 'express';
import { sign } from 'jsonwebtoken';
import { props } from '../../../config/props';

describe('UserTypeGuard Unit Tests', () => {
  let guard: UserTypeGuard;
  let reflector: MockProxy<Reflector>;
  let context: MockProxy<ExecutionContext>;
  let httpContext: MockProxy<HttpArgumentsHost>;
  const managerToken = () => {
    return sign(
      {
        usermetadata: {
          id: 1,
          type: 'MANAGER',
        },
      },
      props.auth.secret,
    );
  };

  beforeEach(() => {
    httpContext = mock<HttpArgumentsHost>();
    context = mock<ExecutionContext>();
    context.switchToHttp.mockReturnValue(httpContext);
    reflector = mock<Reflector>();
    guard = new UserTypeGuard(reflector);
  });

  describe('canActivate', () => {
    it('should allow when no validation is being done on endpoint', () => {
      reflector.get.mockReturnValue([]);
      httpContext.getRequest.mockReturnValue({});

      const actual = guard.canActivate(context);

      expect(actual).toBeTruthy();
    });

    it('should not allow when given user cannot access resource', () => {
      reflector.get.mockReturnValue(['TECHNICIAN']);
      httpContext.getRequest.mockReturnValue({
        headers: {
          authorization: managerToken(),
        },
      } as Request);

      let error;

      try {
        guard.canActivate(context);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(ForbiddenException);
    });

    it('should allow when given user can access resource', () => {
      reflector.get.mockReturnValue(['MANAGER']);
      httpContext.getRequest.mockReturnValue({
        headers: {
          authorization: managerToken(),
        },
      } as Request);

      const actual = guard.canActivate(context);

      expect(actual).toBeTruthy();
    });
  });
});
