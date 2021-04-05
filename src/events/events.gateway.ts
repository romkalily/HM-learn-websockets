import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

@WebSocketGateway()
export class ChatGateway {
    @WebSocketServer()
    server;

    @SubscribeMessage('connect')
    handleConnect(): void {
        this.server.emit('connect')
    }

    @SubscribeMessage('message')
    handleMessage(@MessageBody() message: string): void {
        this.server.emit('message', message);
    }

    @SubscribeMessage('typing')
    handleOnline() {
        this.server.emit('typing')
    }
}
