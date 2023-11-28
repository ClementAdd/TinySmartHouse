import { Controller, Get } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SerialPort } from 'serialport';

@Controller('sensors')
export class SensorsController {

    constructor(private readonly sensorsService: SensorsService) {}

    @Get()
    getTemperature(): string {
        return this.sensorsService.getTemperature();
    }

    @Get()
    getBarometry(): string {
        return this.sensorsService.getBarometry();
    }

    @Get("hygrometry")
    getHygrometry(): string {
        return this.sensorsService.getHygrometry();
    }
}
