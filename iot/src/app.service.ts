import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getFront(): string {
    return 'Hello World!';
  }
}
