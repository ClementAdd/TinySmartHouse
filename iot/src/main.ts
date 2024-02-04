import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const rmqService = app.get<RabbitMqService>(RabbitMqService)
  app.connectMicroservice(rmqService.getOptions('SEND_MAIL'))

  app.startAllMicroservices();

  const viewsDir = join(__dirname, '..', '..', 'views');

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(viewsDir);
  app.setViewEngine('hbs');

  await app.listen(3000);
}

bootstrap();
