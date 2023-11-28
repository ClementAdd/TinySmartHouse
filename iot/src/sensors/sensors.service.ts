import { Injectable } from '@nestjs/common';
import { SensorsController } from './sensors.controller';

@Injectable()
export class SensorsService {

    getTemperature(): string {
        const strTemperature = "";

        const temp = SensorsController.housePort.write('GET_TEMP');
        //return temp;

        return strTemperature;
    }

    getBarometry(): string {
        const strBarometry = "";

        const baro = SensorsController.housePort.write('GET_BARO');

        return strBarometry;
    }

    getHygrometry(): string {
        const strHygrometry = "";

        const hygro = SensorsController.housePort.write('GET_HUMIDITY');
        const hygrotest = SensorsController.housePort.read();

        console.log("hygro");
        console.log(hygro);
        console.log("hygrotest");
        console.log(hygrotest);

        return strHygrometry;
    }
}
