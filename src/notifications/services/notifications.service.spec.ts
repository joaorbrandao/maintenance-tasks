import { NotificationsService } from './notifications.service';
import { PerformedTaskDtoFixture } from '../../tasks/services/publishers/dtos/performed-task.dto.fixture';

describe('NotificationsService Unit Tests', () => {
  let notificationsService: NotificationsService;

  beforeEach(() => {
    notificationsService = new NotificationsService();
  });

  describe('notifyManager', () => {
    it('should notify manager when handling a performed task', () => {
      let error;

      try {
        notificationsService.notifyManager(PerformedTaskDtoFixture.new());
      } catch (e) {
        error = e;
      }

      expect(error).toBeUndefined();
    });
  });
});
