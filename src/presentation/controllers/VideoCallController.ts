import { Request, Response } from 'express';
import { VideoCallUseCase } from '../../application/useCase/VideoCallUseCase';
import { WebSocketServer } from '../../infastructure/repository/WebSocketServer';
import { NotificationUseCase } from '../../application/useCase/NotificationUseCase';

export class VideoCallController {
    private webSocketServer: WebSocketServer;

    constructor(server: any) {
        const videoCallUseCase = new VideoCallUseCase();
        const notificationUsecase = new NotificationUseCase()
        this.webSocketServer = new WebSocketServer(server, videoCallUseCase,notificationUsecase);
    }
}
