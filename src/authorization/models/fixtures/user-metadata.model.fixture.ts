import { UserMetadata } from '../user-metadata.model';

export class UserMetadataFixture {
  static newManager(partial?: Partial<UserMetadata>): UserMetadata {
    return {
      id: 1,
      type: 'MANAGER',
      ...partial,
    };
  }

  static newTechnician(partial?: Partial<UserMetadata>): UserMetadata {
    return {
      id: 2,
      type: 'TECHNICIAN',
      ...partial,
    };
  }
}
