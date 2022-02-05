import { TasksPublisher } from '../../services/publishers/tasks.publisher';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Task } from '../task.model';

@EventSubscriber()
export class TaskSubscriber implements EntitySubscriberInterface<Task> {
  constructor(
    connection: Connection,
    private readonly tasksPublisher: TasksPublisher,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return Task;
  }

  afterInsert(event: InsertEvent<Task>): Promise<any> {
    const task = event.entity;

    return this.tasksPublisher.publishPerformedTask({
      summary: task.summary,
      performedAt: task.performedAt,
      performedBy: task.userId,
    });
  }
}
