import { Controller, Get } from '@nestjs/common';
import { SensorsService } from './sensors.service';
import { SerialPort } from 'serialport';

@Controller('sensors')
export class SensorsController {

    constructor(private readonly sensorsService: SensorsService) {}

    public static housePort = new SerialPort({
        path: '/dev/tty.usbserial-1130',
        baudRate: 9600,
        autoOpen: true
    })

    @Get()
    getTemperature(): string {
        return this.sensorsService.getTemperature();
    }

    @Get()
    getBarometry(): string {
        return this.sensorsService.getBarometry();
    }

    @Get()
    getHygrometry(): string {
        return this.sensorsService.getHygrometry();
    }
}
