import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ControlModule} from './control/control.module';
import {SensorsModule} from './sensors/sensors.module';
import {SerialModule} from './serial/serial.module';
import {TaskSchedulerModule} from './task-scheduler/task-scheduler.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import {join} from 'path';
import {SensorsController} from "./sensors/sensors.controller";
import {EventsGateway} from './events/events.gateway';

@Module({
    imports: [ControlModule, SensorsModule, SerialModule, TaskSchedulerModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'client'),
            exclude: ['/api/(.*)'],
        }),
    ],
    controllers: [AppController],
    providers: [AppService, EventsGateway],
})
export class AppModule {
}
