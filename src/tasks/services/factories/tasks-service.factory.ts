import { Injectable, Logger, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../../models/task.model';
import { TasksServiceInterface } from '../contracts/tasks-service.interface';
import { TasksManagerService } from '../tasks-manager.service';
import { UserMetadata } from 'src/authorization/models/user-metadata.model';
import { TasksTechnicianService } from '../tasks-technician.service';
import { NotMappedTasksServiceException } from '../exceptions/not-mapped-tasks-service.exception';

@Injectable({ scope: Scope.REQUEST })
export class TasksServiceFactory {
  private readonly logger = new Logger(TasksServiceFactory.name);
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  resolve(user: UserMetadata): TasksServiceInterface {
    this.logger.debug(
      `Resolving the TasksService for user type '${user.type}'`,
    );

    const services: Record<string, TasksServiceInterface> = {
      MANAGER: new TasksManagerService(user, this.tasksRepository),
      TECHNICIAN: new TasksTechnicianService(user, this.tasksRepository),
    };

    const service = services[user.type];

    if (!service) {
      throw new NotMappedTasksServiceException(
        `Cannot resolve tasks service for user type '${user.type}'`,
      );
    }

    return service;
  }
}
