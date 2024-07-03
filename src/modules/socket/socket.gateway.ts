import { 
    WebSocketGateway, 
    OnGatewayConnection, 
    WebSocketServer, 
    OnGatewayInit, 
    OnGatewayDisconnect, 
    SubscribeMessage
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
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
  private server: Server;

  afterInit(server: any) {
    console.log('Iniciando Socket.io')
  }

  handleConnection(client: Socket): void {
    console.log(`Alguien se ha conectado: ${client}`)
    this.socketService.handleConnection(client);
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
    payload: { room: string, message: string, user: string }
  ){
    const { room, message, user } = payload;
    console.log(payload)
    this.server.to(`room_${room}`).emit('new_message',{content:message, user});
  }

  @SubscribeMessage('event-leave')
  handleRoomLeave(client: any, room: string){
    console.log(`chao room_${room}`)
    client.leave(room)
  }

}