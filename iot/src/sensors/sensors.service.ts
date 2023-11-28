import { Injectable } from '@nestjs/common';

@Injectable()
export class SensorsService {

    getTemperature(): string {
        const strTemperature = "";
        return strTemperature;
    }

    getBarometry(): string {
        const strBarometry = "";
        return strBarometry;
    }

    getHygrometry(): string {
        const strHygrometry = "";
        return strHygrometry;
    }
}
