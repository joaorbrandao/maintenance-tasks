import { Repository } from 'typeorm';
import { Task } from '../models/task.model';
import { mock, mockClear, MockProxy } from 'jest-mock-extended';
import { TaskFixture } from '../models/fixtures/task.model.fixture';
import { CreateTaskDtoFixture } from '../controllers/dtos/fixtures/create-task.dto.fixture';
import { UserMetadata } from '../../authorization/models/user-metadata.model';
import { UserMetadataFixture } from '../../authorization/models/fixtures/user-metadata.model.fixture';
import { TasksTechnicianService } from './tasks-technician.service';

describe('TasksTechnicianService Unit Tests', () => {
  let user: UserMetadata;
  let service: TasksTechnicianService;
  let tasksRepository: MockProxy<Repository<Task>>;

  beforeEach(() => {
    user = UserMetadataFixture.newTechnician();
    tasksRepository = mock<Repository<Task>>();
    service = new TasksTechnicianService(user, tasksRepository);
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

    it('should get a list of own tasks', async () => {
      const tasks = [TaskFixture.new({ userId: user.id })];
      tasksRepository.find.mockResolvedValue(tasks);

      const actual = await service.getAllTasks();

      expect(actual.length).toEqual(1);
    });
  });

  describe('create', () => {
    it('should create a new task', async () => {
      const expectedTask = TaskFixture.new();
      tasksRepository.save.mockResolvedValue(expectedTask);

      const given = CreateTaskDtoFixture.new();
      const actual = await service.createTask(given);

      expect(actual).toEqual(expectedTask.id);
      tasksRepository.save.calledWith({ ...given, userId: user.id });
    });
  });
});
