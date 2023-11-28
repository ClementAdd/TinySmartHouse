import { Module } from '@nestjs/common';
import { SensorsServiceService } from './sensors_service.service';
import { SensorsServiceController } from './sensors_service.controller';

@Module({
  providers: [SensorsServiceService],
  controllers: [SensorsServiceController]
})
export class SensorsServiceModule {}
