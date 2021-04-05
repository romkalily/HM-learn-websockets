import { Module } from '@nestjs/common';
import { ChatGateway } from './events.gateway';

@Module({
  providers: [ChatGateway],
})
export class EventsModule {}