import { UserType } from './user-type.enum';

export class User {
  id: number;
  username: string;
  password: string;
  type: UserType;
}
