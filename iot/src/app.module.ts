import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ControlModule } from './control/control.module';
import { SensorsModule } from './sensors/sensors.module';
import { SerialModule } from './serial/serial.module';

@Module({
  imports: [ControlModule, SensorsModule, SerialModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
