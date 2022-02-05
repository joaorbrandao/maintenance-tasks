import { PerformedTaskDto } from './performed-task.dto';

export class PerformedTaskDtoFixture {
  static new(): PerformedTaskDto {
    return {
      summary: "Thor's hammer fixed!",
      performedAt: new Date(),
      performedBy: 1,
    };
  }
}
