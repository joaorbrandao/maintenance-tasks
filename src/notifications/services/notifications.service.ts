import { Logger } from '@nestjs/common';
import { PerformedTaskDto } from '../../tasks/services/publishers/dtos/performed-task.dto';

export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  notifyManager(performedTask: PerformedTaskDto): void {
    const { summary, performedAt, performedBy } = performedTask;
    this.logger.log(
      `The tech ${performedBy} performed the task '${summary}' on date ${performedAt}`,
    );
  }
}
