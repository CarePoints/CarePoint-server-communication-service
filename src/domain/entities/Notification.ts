export class Notifications {
    public roomId: string;
    public message: string;
    public timestamp: Date;
  
    constructor(roomId: string, message: string) {
      this.roomId = roomId;
      this.message = message;
      this.timestamp = new Date(); 
    }
  }
  