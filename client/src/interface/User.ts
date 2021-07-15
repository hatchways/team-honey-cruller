export interface User {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
  artist: boolean;
  artwork: string[];
  contests: Contest[];
  conversations: Conversation[];
}

export interface Contest {
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: string;
  dateCreated: string;
  userId: string;
  submissions: Submission[];
}

interface Submission {
  images: string[];
  description: string;
  artistName: string;
  artistId: string;
}

export interface Conversation {
  room: string;
  messages: Message[];
}

export interface Message {
  senderId: string;
  senderName: string;
  senderPic: string;
  recipientId: string;
  recipientName: string;
  recipientPic: string;
  text: string;
  createdAt: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}