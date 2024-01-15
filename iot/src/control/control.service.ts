import {Injectable} from '@nestjs/common';
import {SerialPort} from "serialport";

@Injectable()
export class ControlService {
    lightOn(port: SerialPort) {
        if (!port.isOpen) {
            console.log('Port is not open');
            return;
        }
        port.write("LIGHT_ON\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }

    lightOff(port: SerialPort) {
        if (!port.isOpen) {
            console.log('Port is not open');
            return;
        }
        port.write("LIGHT_OFF\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }

    blindOn(port: SerialPort) {
        if (!port.isOpen) {
            console.log('Port is not open');
            return;
        }
        port.write("BLIND_OPEN\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }

    blindOff(port: SerialPort) {
        if (!port.isOpen) {
            console.log('Port is not open');
            return;
        }
        port.write("BLIND_CLOSE\n", (err) => {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }
}
