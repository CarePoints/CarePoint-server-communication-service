
import { ChatRepository } from '../../infastructure/repository/ChatRepositoryImpl';

export class ChatUseCase {
    private chatRepository: ChatRepository;

    constructor() {
        this.chatRepository = new ChatRepository(); // Initialize repository
    }

    // Send message: This handles business logic and interacts with repository
    async sendMessage(roomId: string, message: string, senderData: string,receiverData:any) {
        // Create the message object
        const newMessage = {
            roomId,
            message,
            senderData,
            receiverData,
            timestamp: new Date(),
        };
        console.log('newMessage',newMessage);
        

        // Save to repository
        return await this.chatRepository.saveMessage(newMessage);
    }
    async getUserMessages(doctorId:string) {
      return await this.chatRepository.getUserDatas(doctorId)
    }

    // Get all messages for a room
    async getMessagesForRoom(roomId: string) {
        return await this.chatRepository.getMessagesForRoom(roomId);
    }
}
