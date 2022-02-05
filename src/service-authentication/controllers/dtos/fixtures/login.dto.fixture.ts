import { LoginDto } from '../login.dto';

export class LoginDtoFixture {
  static new(partial?: Partial<LoginDto>): LoginDto {
    return {
      username: 'spiderman',
      password: 'spiderManIsTechnician',
      ...partial,
    };
  }
}
