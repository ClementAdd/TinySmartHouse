import { Test, TestingModule } from '@nestjs/testing';
import { SensorsServiceService } from './sensors_service.service';

describe('SensorsServiceService', () => {
  let service: SensorsServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorsServiceService],
    }).compile();

    service = module.get<SensorsServiceService>(SensorsServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
