import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Channel, ConsumeMessage } from 'amqplib';
import { props } from '../../../../config/props';
import { PerformedTaskDto } from '../publishers/dtos/performed-task.dto';
import { NotificationsService } from '../../../notifications/services/notifications.service';

@Injectable()
export class TasksConsumer {
  private readonly logger = new Logger(TasksConsumer.name);
  constructor(private readonly notificationsService: NotificationsService) {}

  @RabbitSubscribe({
    exchange: props.broker.exchanges.tasks.name,
    routingKey: props.broker.exchanges.tasks.routingKeys.performed,
    queue: props.broker.exchanges.tasks.queues.performed.name,
    queueOptions: {
      durable: props.broker.exchanges.tasks.queues.performed.options.durable,
      deadLetterExchange: props.broker.exchanges.tasks.deadLetterName,
      deadLetterRoutingKey: props.broker.exchanges.tasks.routingKeys.performed,
    },
    errorHandler: (channel: Channel, msg: ConsumeMessage) => {
      // Triggered on unhandled throws.
      // NACK with requeue as false will send to dead letter exchange.
      channel.nack({ ...msg }, false, false);
    },
  })
  public handlePerformedTask(performedTask: PerformedTaskDto) {
    this.logger.log(
      `Handling performed task: ${JSON.stringify(performedTask)}`,
    );
    this.notificationsService.notifyManager(performedTask);
  }
}
