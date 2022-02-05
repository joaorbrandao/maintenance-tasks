import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { props } from '../config/props';
import { getMetadataArgsStorage } from 'typeorm';
import { TasksModule } from './tasks/tasks.module';
import { HealthModule } from './health/health.module';
import { AuthenticationModule } from './service-authentication/authentication.module';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    HealthModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: props.database.host,
      port: parseInt(props.database.port),
      username: props.database.user,
      password: props.database.password,
      database: props.database.name,
      synchronize: true,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    AuthenticationModule,
    AuthorizationModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
