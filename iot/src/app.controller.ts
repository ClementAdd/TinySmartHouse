import {Controller, Get, Render} from '@nestjs/common';
import { AppService } from './app.service';
import {SensorsModule} from "./sensors/sensors.module";
import {SensorsService} from "./sensors/sensors.service";

@Controller()
export class AppController {

  constructor(private readonly sensorsService: SensorsService) {}

  @Get()
  @Render('index')
  async root() {
    const sensors = await this.sensorsService.getAll();
    const sensorsJson = JSON.parse(sensors);
    const pressure = await this.sensorsService.getBarometry();
    const temperature = await this.sensorsService.getTemperature();
    const humidity = await this.sensorsService.getHygrometry();


    return {message: 'Hello world! + ' + sensors + ' ' + sensorsJson, pressure: JSON.parse(pressure).value + ' ' + JSON.parse(pressure).unit,
        temperature: JSON.parse(temperature).value + ' ' + JSON.parse(temperature).unit,
        humidity: JSON.parse(humidity).value + ' ' + JSON.parse(humidity).unit};
  }
}
