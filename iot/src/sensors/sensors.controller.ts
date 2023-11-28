import { Controller, Get } from '@nestjs/common';
import { SensorsService } from './sensors.service';

@Controller('sensors')
export class SensorsController {
    static sensorsService: any;

    constructor(private readonly sensorsService: SensorsService) {}

    @Get("temperature")
    public static getTemperature(): Promise<string> {
        return this.sensorsService.getTemperature();
    }

    @Get("barometry")
    public static getBarometry(): Promise<string> {
        return this.sensorsService.getBarometry();
    }

    @Get("hygrometry")
    public static getHygrometry(): Promise<string> {
        return this.sensorsService.getHygrometry();
    }

    @Get("motion")
    public static getMotionSensorData(): Promise<string> {
        return this.sensorsService.getMotionSensorData();
    }

    @Get("all")
    public static getAll(): Promise<string> {
        return this.sensorsService.getAll();
    }
    
}
