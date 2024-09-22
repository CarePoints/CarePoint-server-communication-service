
export class ChatMessage {
    constructor(
        public messageId: string,
        public roomId: string,
        public senderId: string,
        public message: string,
        public timestamp: Date = new Date(),
    ) {}
}
