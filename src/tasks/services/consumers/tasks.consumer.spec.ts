import { TasksConsumer } from './tasks.consumer';
import { PerformedTaskDtoFixture } from '../publishers/dtos/performed-task.dto.fixture';
import { NotificationsService } from '../../../notifications/services/notifications.service';
import { mock, MockProxy } from 'jest-mock-extended';

describe('TasksConsumer Unit Tests', () => {
  let consumer: TasksConsumer;
  let notificationsService: MockProxy<NotificationsService>;

  beforeEach(() => {
    notificationsService = mock<NotificationsService>();
    consumer = new TasksConsumer(notificationsService);
  });

  describe('handlePerformedTask', () => {
    it('should notify manager when handling a performed task', () => {
      consumer.handlePerformedTask(PerformedTaskDtoFixture.new());

      expect(notificationsService.notifyManager).toBeCalled();
    });
  });
});
