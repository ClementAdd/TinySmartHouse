import { Module } from '@nestjs/common';
import { TaskSchedulerService } from './task-scheduler.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  providers: [TaskSchedulerService],
  imports: [ScheduleModule.forRoot()],
})
export class TaskSchedulerModule {}
