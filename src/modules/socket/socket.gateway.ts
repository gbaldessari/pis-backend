import { 
    WebSocketGateway, 
    OnGatewayConnection, 
    WebSocketServer, 
    OnGatewayInit, 
    OnGatewayDisconnect, 
    SubscribeMessage
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway(81, {
    cors: {
        origin: '*'
    }
})

export class SocketGateway implements 
    OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
        
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  private server: Socket;

  afterInit(server: any) {
    console.log('Esto se ejecuta cuando inicia socket.io xd')
  }

  handleConnection(socket: Socket): void {
    this.socketService.handleConnection(socket);
  }

  handleDisconnect(client: any) {
    console.log('Alguien se ha desconectado.')
  }

  @SubscribeMessage('event-join')
  handleJoinRoom(client: Socket, room: string){
    console.log(`room_${room}`);
    client.join(`room_${room}`);
  }

  @SubscribeMessage('event-message')
  handleIncomingMessage(
    client: Socket,
    payload: { room: string, message: string }
  ){
    const { room, message } = payload;
    console.log(payload)
    this.server.to(`room_${room}`).emit('new_message',message);
  }

  @SubscribeMessage('event-leave')
  handleRoomLeave(client: any, room: string){
    console.log(`chao room_${room}`)
    client.leave(room)
  }

}