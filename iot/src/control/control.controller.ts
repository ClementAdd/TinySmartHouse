import {Controller, Get, Post} from '@nestjs/common';
import {SerialPort} from "serialport";

@Controller('control')
export class ControlController {

    port: SerialPort;

    constructor() {
        this.port = new SerialPort({
            path: '/dev/tty.usbserial-1130',
            baudRate: 9600,
            autoOpen: true
        });

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
