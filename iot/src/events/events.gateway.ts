import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { TaskSchedulerService} from "../task-scheduler/task-scheduler.service";

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private taskSchedulerService: TaskSchedulerService) {
    this.taskSchedulerService.motionSensorState$.subscribe(state => {
      if (state) {
        this.server.emit('motionDetected');
      }
    });
  }
}