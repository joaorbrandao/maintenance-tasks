import { Task } from '../task.model';

export class TaskFixture {
  static new(partial?: Partial<Task>): Task {
    return {
      id: 1,
      summary: "Fix Thor's hammer",
      userId: 1,
      ...partial,
    };
  }
}
