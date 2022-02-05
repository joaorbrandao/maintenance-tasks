import { mock, MockProxy } from 'jest-mock-extended';
import { TasksPublisher } from '../../services/publishers/tasks.publisher';
import {
  Connection,
  ConnectionOptions,
  EntitySubscriberInterface,
  InsertEvent,
} from 'typeorm';
import { Task } from '../task.model';
import { TaskSubscriber } from './task.subscriber';

class ConnectionMock extends Connection {
  subscribers: EntitySubscriberInterface[] = [];
}

describe('TaskSubscriber Unit Tests', () => {
  let subscriber: TaskSubscriber;
  let connection: ConnectionMock;
  const connectionOptions: ConnectionOptions = { type: 'mysql' };
  let tasksPublisher: MockProxy<TasksPublisher>;

  beforeEach(() => {
    connection = new ConnectionMock(connectionOptions);
    tasksPublisher = mock<TasksPublisher>();
    subscriber = new TaskSubscriber(connection, tasksPublisher);
  });

  describe('afterInsert', () => {
    let insertEvent: MockProxy<InsertEvent<Task>>;

    beforeEach(() => {
      insertEvent = mock<InsertEvent<Task>>();
    });

    it('should publish message to the broker to notify manager', async () => {
      tasksPublisher.publishPerformedTask.mockResolvedValue();
      await subscriber.afterInsert(insertEvent);

      expect(true).toBeTruthy();
    });
  });

  describe('listenTo', () => {
    it('should return the Task type', () => {
      const actual = subscriber.listenTo();
      expect(actual).toEqual(Task);
    });
  });
});
