import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SensorsController } from 'src/sensors/sensors.controller';

@Injectable()
export class TaskSchedulerService {private readonly logger = new Logger(TaskSchedulerService.name);

    @Cron(CronExpression.EVERY_MINUTE)
    cronSensors() {
        SensorsController.GetAll();
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    cronMotion() {

    }
}
