import { Test, TestingModule } from '@nestjs/testing';
import { SensorsServiceController } from './sensors_service.controller';

describe('SensorsServiceController', () => {
  let controller: SensorsServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorsServiceController],
    }).compile();

    controller = module.get<SensorsServiceController>(SensorsServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
