export interface User {
  _id: string;
  email: string;
  username: string;
  profilePic: string;
  artist: boolean;
  artwork: string[];
  contests: Contest[];
  conversations: Convo[];
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

interface Recipient {
  _id: string;
  username: string;
  email: string;
}

export interface Convo {
  _id: string;
  lastMessage: string;
  date: string;
  recipients: Recipient[];
}

export interface Message {
  senderId: string;
  senderName: string;
  senderPic: string;
  recipientId: string;
  recipientName: string;
  recipientPic: string;
  text: string;
  lastMessage: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
