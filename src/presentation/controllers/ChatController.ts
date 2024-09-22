import { Server as SocketIOServer } from 'socket.io';
import { ChatUseCase } from '../../application/useCase/ChatUseCase';

export class ChatController {
    private io: SocketIOServer;
    private chatUseCase: ChatUseCase;

    constructor(server: any) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: '*',
            },
        });

        this.chatUseCase = new ChatUseCase();
        this.setupSocketEvents();
    }

    private setupSocketEvents(): void {
        this.io.on('connection', (socket) => { // Use namespace '/chat'
            console.log('User connected:for chating', socket.id);

            socket.on('get-message',async(data)=>{
                console.log('the doctor id is', data)
                const getMessages = await this.chatUseCase.getUserMessages(data)
                console.log('datassssssssssssss', getMessages);
                
                this.io.to(data).emit('receive-full-messages',getMessages)
            }) 

            // Listen for new chat messages
            socket.on('send-message', async (data) => {
                const { roomId, message, senderData ,receiverData} = data;
                console.log('roomId', roomId);
                const savedMessage = await this.chatUseCase.sendMessage(roomId, message, senderData,receiverData);
                
                console.log('savedMessage us', savedMessage);
             
                // Emit the message to the room
                this.io.to(roomId).emit('receive-message', savedMessage);
            });

            // Join a room
            socket.on('join-chat-room', (roomId) => {
                socket.join(roomId);
                console.log(`User ${socket.id} joined room: ${roomId}`);
            });

            socket.on('disconnect', () => {
                console.log('User disconnected:', socket.id);
            });
        });
    }
}
