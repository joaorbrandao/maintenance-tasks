import { TasksController } from './tasks.controller';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { TasksManagerService as TasksTechnicianService } from '../services/tasks-manager.service';
import { CreateTaskDtoFixture } from './dtos/fixtures/create-task.dto.fixture';
import { ForbiddenException } from '@nestjs/common';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { UserMetadataFixture } from '../../authorization/models/fixtures/user-metadata.model.fixture';
import { TasksServiceFactory } from '../services/factories/tasks-service.factory';

describe('TasksController Unit Tests', () => {
  describe('Manager', () => {
    let user: UserMetadata;
    let controller: TasksController;
    let tasksServiceFactory: MockProxy<TasksServiceFactory>;
    let tasksManagerService: MockProxy<TasksTechnicianService>;

    beforeEach(() => {
      user = UserMetadataFixture.newManager();
      tasksServiceFactory = mock<TasksServiceFactory>();
      tasksManagerService = mock<TasksTechnicianService>();
      controller = new TasksController(tasksServiceFactory);
    });

    afterEach(() => {
      mockClear(tasksManagerService);
      mockClear(tasksServiceFactory);
    });

    describe('listTasks', () => {
      it('should get an empty list when no tasks exist', async () => {
        tasksServiceFactory.resolve.mockReturnValue(tasksManagerService);
        tasksManagerService.getAllTasks.mockResolvedValue([]);
        const actual = await controller.listTasks(user);
        expect(actual.length).toEqual(0);
      });
    });

    describe('createTask', () => {
      it('should throw exception when trying to create a new task', async () => {
        tasksServiceFactory.resolve.mockReturnValue(tasksManagerService);
        tasksManagerService.createTask.mockImplementation(() => {
          throw new ForbiddenException();
        });
        const given = CreateTaskDtoFixture.new();

        let error;
        try {
          await controller.createTask(user, given);
        } catch (e) {
          error = e;
        }

        expect(error).toBeInstanceOf(ForbiddenException);
      });
    });
  });

  describe('Technician', () => {
    let user: UserMetadata;
    let controller: TasksController;
    let tasksServiceFactory: MockProxy<TasksServiceFactory>;
    let tasksTechnicianService: MockProxy<TasksTechnicianService>;

    beforeEach(() => {
      user = UserMetadataFixture.newTechnician();
      tasksServiceFactory = mock<TasksServiceFactory>();
      tasksTechnicianService = mock<TasksTechnicianService>();
      controller = new TasksController(tasksServiceFactory);
    });

    afterEach(() => {
      mockClear(tasksTechnicianService);
    });

    describe('listTasks', () => {
      it('should get an empty list when no tasks exist', async () => {
        tasksServiceFactory.resolve.mockReturnValue(tasksTechnicianService);
        tasksTechnicianService.getAllTasks.mockResolvedValue([]);
        const actual = await controller.listTasks(user);
        expect(actual.length).toEqual(0);
      });
    });

    describe('createTask', () => {
      it('should create a new task', async () => {
        const expectedTaskId = 1;
        tasksServiceFactory.resolve.mockReturnValue(tasksTechnicianService);
        tasksTechnicianService.createTask.mockResolvedValue(expectedTaskId);
        const given = CreateTaskDtoFixture.new();
        const actual = await controller.createTask(user, given);
        expect(actual).toEqual(expectedTaskId);
      });
    });
  });
});
