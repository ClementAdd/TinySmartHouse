import {Controller, Get, Module} from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
    //static sensorsService: any;

    constructor(private readonly sensorsService: SensorsService) {}

    @Get("temperature")
     getTemperature(): Promise<string> {
        return this.sensorsService.getTemperature();
    }

    @Get("barometry")
   getBarometry(): Promise<string> {
        return this.sensorsService.getBarometry();
    }

    @Get("hygrometry")
   getHygrometry(): Promise<string> {
        return this.sensorsService.getHygrometry();
    }

    @Get("motion")
    getMotionSensorData(): Promise<string> {
        return this.sensorsService.getMotionSensorData();
    }

    @Get("all")
    getAll(): Promise<string> {
        return this.sensorsService.getAll();
    }
    
}
