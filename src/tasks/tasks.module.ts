import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.model';
import { TasksController } from './controllers/tasks.controller';
import { VerifyJwtMiddleware } from 'src/authorization/middlewares/verify-jwt.middleware';
import { TasksServiceFactory } from './services/factories/tasks-service.factory';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { props } from '../../config/props';
import { TaskSubscriber } from './models/subscribers/task.subscriber';
import { TasksPublisher } from './services/publishers/tasks.publisher';
import { TasksConsumer } from './services/consumers/tasks.consumer';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      uri: `amqp://${props.broker.host}:${props.broker.port}`,
      connectionInitOptions: { wait: true, timeout: 999999 },
      exchanges: [
        {
          name: props.broker.exchanges.tasks.name,
          options: {
            ...props.broker.exchanges.tasks.options,
          },
        },
      ],
    }),
    NotificationsModule,
  ],
  controllers: [TasksController],
  providers: [
    TasksServiceFactory,
    TaskSubscriber,
    TasksPublisher,
    TasksConsumer,
  ],
})
export class TasksModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyJwtMiddleware).forRoutes(TasksController);
  }
}
