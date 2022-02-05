import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { props } from '../config/props';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(props.server.port);
}
bootstrap();
