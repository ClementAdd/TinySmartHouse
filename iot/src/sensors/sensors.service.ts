import {Injectable} from '@nestjs/common';
import {SerialService} from '../serial/serial.service';
@Injectable()
export class SensorsService {

    housePort = SerialService.housePort;

    private getSensorData(command: string, unit: string): Promise<string> {
        this.housePort.write(`${command}\n`);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Timeout after 5 seconds'));
            }, 5000);

            this.housePort.once('data', (data) => {
                clearTimeout(timeout);
                let result = Buffer.from(data, 'hex').toString();
                let resultArray = result.split('\n');
                const newResultArray = resultArray.map((item) => {
                    return item.replace('\r', '');
                });
                const filteredResultArray = newResultArray.filter((item: string) => item !== '');
                if (filteredResultArray[2] === 'OK') {
                    let jsonResult = {
                        httpCode: 200,
                        value: filteredResultArray[1],
                        unit: unit,
                        date: new Date().toISOString(),
                    }
                    resolve(JSON.stringify(jsonResult));
                }
            });
        });
    }

    getTemperature(): Promise<string> {
        return this.getSensorData('GET_TEMP', '°C');
    }

    getBarometry(): Promise<string> {
        return this.getSensorData('GET_BARO', 'hPa');
    }

    getHygrometry(): Promise<string> {
        return this.getSensorData('GET_HUMIDITY', '%');
    }

    getMotionSensorData(): Promise<string> {
        return this.getSensorData('GET_PIR', '');
    }
}