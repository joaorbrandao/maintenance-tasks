import { props } from '../../../config/props';
import { verify } from 'jsonwebtoken';
import { UserMetadata } from '../models/user-metadata.model';
import { UnauthorizedException } from '@nestjs/common';

export class TokenExtractor {
  static extractUserMetadata(token?: string): UserMetadata {
    if (!token) {
      throw new UnauthorizedException(
        `A JWT must be provided through the 'Authorization' header`,
      );
    }

    const tokenPayload = verify(token, props.auth.secret);

    const userMetadata = new UserMetadata();
    userMetadata.id = tokenPayload['usermetadata']['id'];
    userMetadata.type = tokenPayload['usermetadata']['type'];

    return userMetadata;
  }
}
