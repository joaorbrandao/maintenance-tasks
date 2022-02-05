import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';

describe('AppController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('ping', () => {
    it('should return "pong"', () => {
      expect(appController.ping()).toBe('pong');
    });
  });
});
