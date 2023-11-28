import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SensorsServiceModule } from './sensors_service/sensors_service.module';

@Module({
  imports: [SensorsServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
