import {Controller, Get, Post} from '@nestjs/common';
import {SerialPort} from "serialport";
import {SerialService} from "../serial/serial.service";
import {SensorsService} from "../sensors/sensors.service";
import {ControlService} from "./control.service";

@Controller('control')
export class ControlController {

    port: SerialPort;

    constructor(private readonly controlService: ControlService) {
        this.port = SerialService.housePort;

        this.port.on('data', function (data) {
            console.log('Data:', Buffer.from(data, 'hex').toString());
        });
    }

    @Post("lightOn")
    lightOn() {
        return this.controlService.lightOn(this.port);
    }
    @Post("lightOff")
    lightOff() {
        return this.controlService.lightOff(this.port);
    }

    @Post("blindOn")
    blindOn() {
       return this.controlService.blindOn(this.port);
    }

    @Post("blindOff")
    blindOff() {
     return this.controlService.blindOff(this.port);
    }


}
