import { Task } from '../models/task.model';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../controllers/dtos/create-task.dto';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { TasksServiceInterface } from './contracts/tasks-service.interface';
import { ForbiddenException, Logger } from '@nestjs/common';

export class TasksManagerService implements TasksServiceInterface {
  private readonly logger = new Logger(TasksManagerService.name);
  constructor(
    private user: UserMetadata,
    private tasksRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    this.logger.log(
      `User '${this.user.id}' is getting all tasks from database`,
    );
    return this.tasksRepository.find();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<number> {
    throw new ForbiddenException(
      `A Manager cannot create tasks ${JSON.stringify(createTaskDto)}`,
    );
  }
}
