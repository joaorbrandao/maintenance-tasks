import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { Task } from '../../../tasks/models/task.model';
import { Repository } from 'typeorm';
import { TasksServiceFactory } from './tasks-service.factory';
import { UserMetadataFixture } from '../../../authorization/models/fixtures/user-metadata.model.fixture';
import { TasksManagerService } from '../tasks-manager.service';
import { TasksTechnicianService } from '../tasks-technician.service';
import { NotMappedTasksServiceException } from '../exceptions/not-mapped-tasks-service.exception';

describe('TasksServiceFactory Unit Tests', () => {
  let factory: TasksServiceFactory;
  let tasksRepository: MockProxy<Repository<Task>>;

  beforeEach(() => {
    tasksRepository = mock<Repository<Task>>();
    factory = new TasksServiceFactory(tasksRepository);
  });

  afterEach(() => {
    mockClear(tasksRepository);
  });

  describe('resolve', () => {
    it('should throw exception when given user type is not resolvable', () => {
      const invalidUser = UserMetadataFixture.newManager({
        type: 'invalid-type',
      });
      let error;

      try {
        factory.resolve(invalidUser);
      } catch (e) {
        error = e;
      }

      expect(error).toBeInstanceOf(NotMappedTasksServiceException);
    });

    it('should resolve the service for a manager', () => {
      const manager = UserMetadataFixture.newManager();
      const service = factory.resolve(manager);

      expect(service).toBeInstanceOf(TasksManagerService);
    });

    it('should resolve the service for a technician', () => {
      const technician = UserMetadataFixture.newTechnician();
      const service = factory.resolve(technician);

      expect(service).toBeInstanceOf(TasksTechnicianService);
    });
  });
});
