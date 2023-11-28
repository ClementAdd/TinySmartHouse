import { Injectable } from '@nestjs/common';
import { SensorsController } from './sensors.controller';
import { SerialPort } from 'serialport';
import { SerialService } from '../serial/serial.service';

@Injectable()
export class SensorsService {

    housePort = SerialService.housePort;

    getTemperature(): string {
        const strTemperature = "";

        const temp = this.housePort.write('GET_TEMP\n');
        //return temp;

        return strTemperature;
    }

    getBarometry(): string {
        const strBarometry = "";

        const baro = this.housePort.write('GET_BARO\n');

        return strBarometry;
    }

    getHygrometry(): string {
        this.housePort.write('GET_HUMIDITY\n');
        //Get the output from the serial port
        this.housePort.on('data', function (data) {
            console.log('Data:', Buffer.from(data, 'hex').toString());
        });


        // let hygrotest = "";
        //
        // console.log("hygro");
        // let hygrometry = this.housePort.on('data', function (data) {
        //     console.log('Data:', Buffer.from(data, 'hex').toString());
        //     hygrotest = data;
        // });

        return 'hygrotest';
    }
}
