import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ControlModule } from './control/control.module';
import { EventsGateway } from './events/events.gateway';
import { PrismaModule } from './prisma/prisma.module';
import { SensorsModule } from './sensors/sensors.module';
import { SerialModule } from './serial/serial.module';
import { TaskSchedulerModule } from './task-scheduler/task-scheduler.module';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api/(.*)'],
    }),
    ControlModule,
    SensorsModule,
    SerialModule,
    TaskSchedulerModule,
    AuthModule,
    PrismaModule,
    UsersModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, UsersService, EventsGateway],
})
export class AppModule {}
