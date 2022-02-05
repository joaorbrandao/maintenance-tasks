import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { props } from '../../../config/props';
import { sign } from 'jsonwebtoken';
import { UserType } from '../models/user-type.enum';
import { User } from '../models/user.model';
import { LoginDto } from './dtos/login.dto';

@Controller('/v1/auth')
export class AuthenticationController {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'ironman',
      password: 'ironManIsManager',
      type: UserType.MANAGER,
    },
    {
      id: 2,
      username: 'spiderman',
      password: 'spiderManIsTechnician',
      type: UserType.TECHNICIAN,
    },
  ];

  @Post('/login')
  login(@Body() loginDto: LoginDto): string {
    const user = this.validateUserAuthentication(loginDto);

    return sign(
      {
        usermetadata: {
          id: user.id,
          type: user.type,
        },
      },
      props.auth.secret,
    );
  }

  private validateUserAuthentication({ username, password }: LoginDto): User {
    const validUser = this.users.find(
      (user) => user.username === username && user.password === password,
    );

    if (!validUser) {
      throw new BadRequestException(
        `Provided username or password are not correct.`,
      );
    }

    return validUser;
  }
}
