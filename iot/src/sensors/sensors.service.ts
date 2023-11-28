import {Injectable} from '@nestjs/common';
import {SerialService} from '../serial/serial.service';

@Injectable()
export class SensorsService {

    housePort = SerialService.housePort;

    private getSensorData(type: string, command: string, unit: string): Promise<string> {
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
                        type: type,
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
        return this.getSensorData('Temperature', 'GET_TEMP', '°C');
    }

    getBarometry(): Promise<string> {
        return this.getSensorData('Barometry', 'GET_BARO', 'hPa');
    }

    getHygrometry(): Promise<string> {
        return this.getSensorData('Hygrometry', 'GET_HUMIDITY', '%');
    }

    getAll(): Promise<string> {
        return new Promise((resolve, reject) => {
            let values: any[] = [];
            let result = {
                httpCode: 200,
                date: new Date().toISOString(),
                values: values
            }
            this.getTemperature().then((data) => {
                values.push(JSON.parse(data));
                this.getBarometry().then((data) => {
                    values.push(JSON.parse(data));
                    this.getHygrometry().then((data) => {
                        values.push(JSON.parse(data));
                        resolve(JSON.stringify(result));
                    }).catch((err) => {
                        reject(err);
                    });
                }).catch((err) => {
                    reject(err);
                });
            }).catch((err) => {
                reject(err);
            });
        });
    }

    getMotionSensorData(): Promise<string> {
        return this.getSensorData('GET_PIR', '');
    }
}