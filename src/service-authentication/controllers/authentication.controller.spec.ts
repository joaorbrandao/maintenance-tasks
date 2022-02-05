import { BadRequestException } from '@nestjs/common';
import { props } from '../../../config/props';
import { verify } from 'jsonwebtoken';
import { AuthenticationController } from './authentication.controller';
import { LoginDtoFixture } from './dtos/fixtures/login.dto.fixture';

describe('AuthenticationController Unit Tests', () => {
  let controller: AuthenticationController;

  beforeEach(() => {
    controller = new AuthenticationController();
  });

  describe('login', () => {
    it('should throw a bad request error when the given user is not valid', () => {
      const given = LoginDtoFixture.new({ username: 'invalid' });
      let error;

      try {
        controller.login(given);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(BadRequestException);
    });

    it('should throw a bad request error when the given password is not valid', () => {
      const given = LoginDtoFixture.new({ password: 'invalid' });
      let error;

      try {
        controller.login(given);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(BadRequestException);
    });

    it('should return a valid JWT when a valid login is provided', () => {
      const given = LoginDtoFixture.new();

      const jwt = controller.login(given);

      let error;

      try {
        verify(jwt, props.auth.secret);
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });
  });
});
