import { Module } from '@nestjs/common';
import { ControlService } from './control.service';
import { ControlController } from './control.controller';

@Module({
  providers: [ControlService],
  controllers: [ControlController]
})
export class ControlModule {}
