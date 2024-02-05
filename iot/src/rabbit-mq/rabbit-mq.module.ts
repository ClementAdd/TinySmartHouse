import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';

interface RmqModuleOptions {
  name: string;
}

@Module({
  providers: [RabbitMqService],
  exports: [RabbitMqService],
})
export class RabbitMqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RabbitMqModule,
      imports: [
        ClientsModule.register([
          {
            name,
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://user:password@localhost:5672'],
              queue: `${name}_QUEUE`,
            },
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
