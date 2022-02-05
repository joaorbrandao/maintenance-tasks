import { CreateTaskDto } from '../../controllers/dtos/create-task.dto';
import { Task } from '../../models/task.model';

export interface TasksServiceInterface {
  getAllTasks(): Promise<Task[]>;
  createTask(createTaskDto: CreateTaskDto): Promise<number>;
}
