import { SetMetadata } from '@nestjs/common';

export const AllowedUserTypes = (...userTypes: string[]) =>
  SetMetadata('userTypes', userTypes);
