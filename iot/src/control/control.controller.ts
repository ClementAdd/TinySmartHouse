import {Controller, Get, Post} from '@nestjs/common';
import {SerialPort} from "serialport";
import {SerialService} from "../serial/serial.service";

@Controller('control')
export class ControlController {

    port: SerialPort;

    constructor() {
        this.port = SerialService.housePort;

        this.port.on('data', function (data) {
            console.log('Data:', Buffer.from(data, 'hex').toString());
        });
    }

    @Post("lightOn")
    lightOn() {
        if (!this.port.isOpen) {
            console.log('Port is not open');
            return;
        }
        this.port.write("LIGHT_ON\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }

    @Post("lightOff")
    lightOff() {
        if (!this.port.isOpen) {
            console.log('Port is not open');
            return;
        }
        this.port.write("LIGHT_OFF\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');

        });
    }

    @Post("blindOn")
    blindOn() {
        if (!this.port.isOpen) {
            console.log('Port is not open');
            return;
        }
        this.port.write("BLIND_OPEN\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');

        });
    }

    @Post("blindOff")
    blindOff() {
        if (!this.port.isOpen) {
            console.log('Port is not open');
            return;
        }
        this.port.write("BLIND_CLOSE\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');

        });
    }


}
