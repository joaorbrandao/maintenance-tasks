import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { props } from '../../../../config/props';
import { mock, MockProxy } from 'jest-mock-extended';
import { PerformedTaskDtoFixture } from './dtos/performed-task.dto.fixture';
import { TasksPublisher } from './tasks.publisher';

describe('TasksPublisher Unit Tests', () => {
  let publisher: TasksPublisher;
  let amqpConnection: MockProxy<AmqpConnection>;

  beforeEach(() => {
    amqpConnection = mock<AmqpConnection>();
    publisher = new TasksPublisher(amqpConnection);
  });

  describe('publishPerformedTask', () => {
    it('should publish message to tasks topic and performed routing key', async () => {
      const performedTask = PerformedTaskDtoFixture.new();
      await publisher.publishPerformedTask(performedTask);
      amqpConnection.publish.calledWith(
        props.broker.exchanges.tasks.name,
        props.broker.exchanges.tasks.routingKeys.performed,
        performedTask,
      );
    });
  });
});
