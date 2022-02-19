import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  socket: Server;

  handleConnection() {
    console.log('user connected');
  }

  handleDisconnect() {
    console.log('user disconnect');
  }

  @SubscribeMessage('CLIENT:messageSent')
  handleMessageSent(client: Socket, message) {
    this.chatService.createMessage(message);

    this.socket.emit('SERVER:messageSent', message);
  }

  @SubscribeMessage('CLIENT:joinChat')
  handleJoinChat(client: Socket, chatId) {
    client.join(chatId);
    console.log('user join to chat');
  }

  @SubscribeMessage('CLIENT:leaveChat')
  handleLeaveChat(client: Socket, chatId) {
    client.leave(chatId);
    console.log('user leave chat');
  }
}
