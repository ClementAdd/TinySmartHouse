import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlModule } from './control/control.module';
import { SensorsModule } from './sensors/sensors.module';

@Module({
  imports: [ControlModule, SensorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
