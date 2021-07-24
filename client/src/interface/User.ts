export interface User {
  id: string;
  email: string;
  username: string;
  profilePic: string;
  artist: boolean;
  artwork: string[];
  contests: Contest[];
  conversations: Convo[];
  activeConvo: Message[];
}

export interface Contest {
  //also need an id
  _id: number;
  title: string;
  description: string;
  prizeAmount: number;
  deadlineDate: string;
  dateCreated: string;
  userId: string;
  submissions: Submission[];
}

export interface Submission {
  contest: string;
  images: string[];
  artistName: string;
  artistId: string;
  active: boolean;
}

interface Recipient {
  _id: string;
  username: string;
  email: string;
  profilePic: string;
}

export interface Convo {
  _id: string;
  lastMessage: string;
  createdAt: string;
  updatedAt: string;
  recipients: Recipient[];
}

export interface Message {
  _id: string;
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

export interface Customer {
  id: string;
}

export interface Notification {
  opened: boolean;
  _id: string;
  to: string;
  from: string;
  notification: string;
  createdAt: string;
  profilePic: string;
}
