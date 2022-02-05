import { Body, Controller, Get, Logger, Post, UseGuards } from '@nestjs/common';
import { Task } from '../models/task.model';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UserTypeGuard } from '../../authorization/guards/user-type.guard';
import { AllowedUserTypes } from '../../authorization/decorators/user-types.decorator';
import { User } from '../../authorization/decorators/user.decorator';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { TasksServiceFactory } from '../services/factories/tasks-service.factory';

@Controller('/v1/tasks')
@UseGuards(UserTypeGuard)
export class TasksController {
  private readonly logger = new Logger(TasksController.name);
  constructor(private readonly tasksServiceFactory: TasksServiceFactory) {}

  @Get()
  @AllowedUserTypes('MANAGER', 'TECHNICIAN')
  listTasks(@User() user: UserMetadata): Promise<Task[]> {
    this.logger.log(`User '${user.id}' is listing tasks`);
    return this.tasksServiceFactory.resolve(user).getAllTasks();
  }

  @Post()
  @AllowedUserTypes('TECHNICIAN')
  createTask(
    @User() user: UserMetadata,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<number> {
    this.logger.log(
      `User '${user.id}' is creating a new task: ${createTaskDto}`,
    );
    return this.tasksServiceFactory.resolve(user).createTask(createTaskDto);
  }
}
