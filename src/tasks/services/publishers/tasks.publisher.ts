import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { props } from '../../../../config/props';
import { PerformedTaskDto } from './dtos/performed-task.dto';

@Injectable()
export class TasksPublisher {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  public publishPerformedTask(performedTask: PerformedTaskDto): Promise<void> {
    return this.amqpConnection.publish(
      props.broker.exchanges.tasks.name,
      props.broker.exchanges.tasks.routingKeys.performed,
      performedTask,
    );
  }
}
