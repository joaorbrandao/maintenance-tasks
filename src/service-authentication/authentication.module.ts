import { Module } from '@nestjs/common';
import { AuthenticationController } from './controllers/authentication.controller';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [],
})
export class AuthenticationModule {}
