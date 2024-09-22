import mongoose, { Schema, Document } from 'mongoose';

export interface ISenderData {
    id: string;
    name: string;
}

export interface IReceiverData {
    id: string;
    name: string;
}

export interface IChatMessage extends Document {
    roomId: string;
    message: string;
    senderData: ISenderData;
    receiverData: IReceiverData;
    timestamp: Date;
}

const SenderDataSchema: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
});

const ReceiverDataSchema: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
});

const ChatSchema: Schema = new Schema({
    roomId: { type: String, required: true },
    message: { type: String, required: true },
    senderData: { type: SenderDataSchema, required: true },  // Embedded sender data schema
    receiverData: { type: ReceiverDataSchema, required: true }, // Embedded receiver data schema
    timestamp: { type: Date, default: Date.now },
});

export const ChatModel = mongoose.model<IChatMessage>('Chat', ChatSchema);
