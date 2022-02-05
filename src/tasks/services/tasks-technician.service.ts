import { Task } from '../models/task.model';
import { Repository } from 'typeorm';
import { CreateTaskDto } from '../controllers/dtos/create-task.dto';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { TasksServiceInterface } from './contracts/tasks-service.interface';
import { Logger } from '@nestjs/common';

export class TasksTechnicianService implements TasksServiceInterface {
  private readonly logger = new Logger(TasksTechnicianService.name);
  constructor(
    private user: UserMetadata,
    private tasksRepository: Repository<Task>,
  ) {}

  getAllTasks(): Promise<Task[]> {
    this.logger.log(
      `User '${this.user.id}' is getting own tasks from database`,
    );
    return this.tasksRepository.find({ id: this.user.id });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<number> {
    this.logger.log(`User '${this.user.id}' is creating new task in database`);

    const task = await this.tasksRepository.save({
      ...createTaskDto,
      userId: this.user.id,
    });
    this.logger.log(
      `User '${this.user.id}' is created new task in database: ${JSON.stringify(
        task,
      )}`,
    );

    return task.id;
  }
}
