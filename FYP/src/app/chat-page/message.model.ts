// message.model.ts
export interface Message {
    objectId?: string; // Parse provides an objectId for each stored object
    text: string;
    senderId: string;
    receiverId: string;
    conversationId?: string;
    createdAt?: Date;
    sender1: string;
    sender:string
  }
  