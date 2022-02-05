import { TasksManagerService } from './tasks-manager.service';
import { Repository } from 'typeorm';
import { Task } from '../models/task.model';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { CreateTaskDtoFixture } from '../controllers/dtos/fixtures/create-task.dto.fixture';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { UserMetadataFixture } from '../../authorization/models/fixtures/user-metadata.model.fixture';
import { ForbiddenException } from '@nestjs/common';

describe('TasksService Unit Tests', () => {
  let user: UserMetadata;
  let service: TasksManagerService;
  let tasksRepository: MockProxy<Repository<Task>>;

  beforeEach(() => {
    user = UserMetadataFixture.newManager();
    tasksRepository = mock<Repository<Task>>();
    service = new TasksManagerService(user, tasksRepository);
  });

  afterEach(() => {
    mockClear(tasksRepository);
  });

  describe('getAllTasks', () => {
    it('should get an empty list when no tasks exist', async () => {
      tasksRepository.find.mockResolvedValue([]);
      const actual = await service.getAllTasks();
      expect(actual.length).toEqual(0);
    });
  });

  describe('createTask', () => {
    it('should throw exception when trying to create a new task', async () => {
      const given = CreateTaskDtoFixture.new();
      let error;

      try {
        await service.createTask(given);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(ForbiddenException);
    });
  });
});
