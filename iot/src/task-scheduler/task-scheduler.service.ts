import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SensorsController } from 'src/sensors/sensors.controller';
import { SensorsService } from "../sensors/sensors.service";

@Injectable()
export class TaskSchedulerService {
    private readonly logger = new Logger(TaskSchedulerService.name);

    constructor(private readonly sensorsService: SensorsService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    cronSensors() {
        console.log(this.sensorsService.getAll());
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    cronMotion() {
        console.log(this.sensorsService.getMotionSensorData());
    }
}
