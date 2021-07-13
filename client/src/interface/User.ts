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

interface Contest {
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

interface Conversation {
  room: string;
  messages: Message[];
}

interface Message {
  senderId: string;
  senderName: string;
  senderPic: string;
  recipientId: string;
  recipientName: string;
  recipientPic: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
