// import { Server as SocketIOServer } from 'socket.io';
// import { VideoCallUseCase } from '../../application/useCase/VideoCallUseCase';


// export class WebSocketServer {
//     private io: SocketIOServer;
//     private videoCallUseCase: VideoCallUseCase;

//     constructor(server: any, videoCallUseCase: VideoCallUseCase) {
//         this.io = new SocketIOServer(server, {
//             cors: {
//                 origin: '*',
//             }
//         });
//         this.videoCallUseCase = videoCallUseCase;

//         this.setupSocketEvents();
//     }

//     private setupSocketEvents(): void {
//         this.io.on('connection', (socket) => {
//             console.log('New client connection', socket.id);

//             socket.on('create-call', (data) => {
//                 console.log('create-call is workinggggggggggg',data);
                
//                 const call = this.videoCallUseCase.createCall(data.roomId, socket.id);
//                 socket.to(data.roomId).emit('call-created', call);
//                 console.log('call-created emitted');
//             });

//             socket.on('offer', (data) => {
//                 const call = this.videoCallUseCase.getCall(data.callId);
//                 if (call) {
//                     this.io.to(call.roomId).emit('offer', { offer: data.offer, from: socket.id });
//                 }
//             });

//             socket.on('answer', (data) => {
//                 const call = this.videoCallUseCase.getCall(data.callId);
//                 if (call) {
//                     this.io.to(call.roomId).emit('answer', { answer: data.answer, from: socket.id });
//                 }
//             });

//             socket.on('ice-candidate', (data) => {
//                 const call = this.videoCallUseCase.getCall(data.callId);
//                 if (call) {
//                     this.io.to(call.roomId).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
//                 }
//             });

//             socket.on('disconnect', () => {
//                 console.log('Client disconnected');
//             });
//         });
//     }
// }


import { Server as SocketIOServer } from 'socket.io';
import { VideoCallUseCase } from '../../application/useCase/VideoCallUseCase';
import { NotificationUseCase } from '../../application/useCase/NotificationUseCase';

export class WebSocketServer {
    private io: SocketIOServer;
    private videoCallUseCase: VideoCallUseCase;
    private notificationUsecase : NotificationUseCase;

    constructor(server: any, videoCallUseCase: VideoCallUseCase, notificationUsecase:NotificationUseCase) {
        this.io = new SocketIOServer(server, {
            cors: {
                origin: '*',
            }
        });
        this.videoCallUseCase = videoCallUseCase;
        this.notificationUsecase = notificationUsecase;

        this.setupSocketEvents();
    }

    private setupSocketEvents(): void {
        this.io.on('connection', (socket) => {
            console.log('New client connected:', socket.id);

            socket.on('create-call', (data) => {
                console.log('Create call event received:', data);
                const roomId = data.roomId;
                socket.join(roomId);
                console.log(`Socket ${socket.id} joined room: ${roomId}`);
                const call = this.videoCallUseCase.createCall(data.roomId,data.offer);
                this.io.to(roomId).emit('call-created', call);
                console.log('Call created event emitted');
            });

            socket.on('join-room', (data) => {
                const roomId = data.roomId;
                socket.join(roomId);
                console.log(`Socket ${socket.id} joined room: ${roomId}`);
            });
            

            socket.on('offer', (data) => {
                const call = this.videoCallUseCase.getCall(data.roomId);
                if (call) {
                    this.io.to(call.roomId).emit('offer', { offer: data.offer, from: socket.id });
                }
            });

            socket.on('answer', (data) => {
                console.log('answer also created successufully',data)
                const call = this.videoCallUseCase.getCall(data.roomId);
                console.log('the call is',call)
                if (call) {
                    this.io.to(call.roomId).emit('answer', { answer: data.answer, from: socket.id });
                    console.log('everything is correct')
                }
            });

            socket.on('ice-candidate', (data) => {
                console.log('ice candidate is working',data)
                const call = this.videoCallUseCase.getCall(data.roomId);
                if (call) {
                    this.io.to(call.roomId).emit('ice-candidate', { candidate: data.candidate, from: socket.id });
                }
            });


            socket.on('notify-user', (data) => {
                const { roomId, message } = data;
        
                console.log('the roome id is',roomId, 'and message is', message);
                
                // Create and save notification
                const notification = this.notificationUsecase.sendNotification(roomId, message);
            
                // Emit the notification to the users in the room
                this.io.to(roomId).emit('notification', notification);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected:', socket.id);
            });
        });
    }
}
