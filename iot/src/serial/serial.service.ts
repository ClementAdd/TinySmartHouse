import { Injectable } from '@nestjs/common';
import {SerialPort} from "serialport";

@Injectable()
export class SerialService {

    public static housePort = new SerialPort({
        path: '/dev/tty.usbserial-1130',
        baudRate: 9600,
        autoOpen: true
    })
}
