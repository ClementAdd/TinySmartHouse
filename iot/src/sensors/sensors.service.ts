import { Injectable } from '@nestjs/common';
import { SensorsController } from './sensors.controller';
import { SerialPort } from 'serialport';

@Injectable()
export class SensorsService {

    public static housePort = new SerialPort({
        path: '/dev/tty.usbserial-1130',
        baudRate: 9600,
        autoOpen: true
    })

    getTemperature(): string {
        const strTemperature = "";

        const temp = SensorsService.housePort.write('GET_TEMP\n');
        //return temp;

        return strTemperature;
    }

    getBarometry(): string {
        const strBarometry = "";

        const baro = SensorsService.housePort.write('GET_BARO\n');

        return strBarometry;
    }

    getHygrometry(): string {
        const strHygrometry = "";

        const hygro = SensorsService.housePort.write('GET_HUMIDITY\n');
        const hygrotest = SensorsService.housePort.read();

        console.log("hygro");
        console.log(hygro);
        console.log("hygrotest");
        console.log(hygrotest);

        return strHygrometry;
    }
}
