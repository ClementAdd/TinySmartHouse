import { Module } from '@nestjs/common';
import { TaskSchedulerService } from './task-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';
import { SensorsModule } from "../sensors/sensors.module";
import {SensorsService} from "../sensors/sensors.service";

@Module({
  providers: [TaskSchedulerService, SensorsService], // Make sure SensorsService is included here
  imports: [ScheduleModule.forRoot(), SensorsModule],
    exports: [TaskSchedulerService],
})
export class TaskSchedulerModule {}


