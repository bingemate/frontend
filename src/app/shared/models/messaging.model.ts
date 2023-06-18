export interface MessagingStateModel {
  unreadMessages: boolean;
  messages: Message[];
  users: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
}
