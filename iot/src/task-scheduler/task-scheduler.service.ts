import {Injectable, Logger} from '@nestjs/common';
import {Cron, CronExpression} from '@nestjs/schedule';
import {SensorsController} from 'src/sensors/sensors.controller';
import {SensorsService} from "../sensors/sensors.service";
import {Subject} from "rxjs";

@Injectable()
export class TaskSchedulerService {
    private readonly logger = new Logger(TaskSchedulerService.name);

    constructor(private readonly sensorsService: SensorsService) {
    }

    @Cron(CronExpression.EVERY_MINUTE)
    cronSensors() {
        console.log(this.sensorsService.getAll());
    }

    motionSensorState: boolean = false;
    motionSensorState$ = new Subject<boolean>();


    @Cron(CronExpression.EVERY_5_SECONDS)
    cronMotion() {
        console.log(this.sensorsService.getMotionSensorData().then((data) => {
            if (JSON.parse(data).value === 'PIR_ON') {
                this.motionSensorState = true;
            } else {
                this.motionSensorState = false;
            }

            this.motionSensorState$.next(this.motionSensorState);

            console.log('Motion sensor : ' + this.motionSensorState);
        }));
    }
}
