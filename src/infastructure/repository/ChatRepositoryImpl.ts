
import { ChatModel } from '../database/modal/ChatModel';


export class ChatRepository {
    // Save message to MongoDB



    
    async getUserDatas(doctorId: string) {
        try {
            console.log('doctir id uis',doctorId)
            const receiverDatas = await ChatModel.find({ 'receiverData.id': doctorId }).exec();
            const senderDatas = await ChatModel.find({'senderData.id': doctorId })

            // console.log('Found message:', newMessage);
            console.log('Found senderDatas', senderDatas);

            if (!receiverDatas) {
                console.log('No message found for doctorId:', doctorId);
                return null;
            }
            return {receiverDatas , senderDatas};
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error;
        }
    }
    
    
    async saveMessage(messageData: any) {
        const newMessage = new ChatModel(messageData);
        console.log('newMessage saved ', newMessage);
        return await newMessage.save();
    }
    

    // Get all messages for a room from MongoDB
    async getMessagesForRoom(roomId: string) {
        return await ChatModel.find({ roomId }).sort({ timestamp: 1 }).exec();
    }
}
