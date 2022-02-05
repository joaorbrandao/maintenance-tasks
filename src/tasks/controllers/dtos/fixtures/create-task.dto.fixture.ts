import { CreateTaskDto } from '../create-task.dto';

export class CreateTaskDtoFixture {
  static new(partial?: Partial<CreateTaskDto>): CreateTaskDto {
    return {
      summary: "Fix Thor's hammer",
      ...partial,
    };
  }
}
