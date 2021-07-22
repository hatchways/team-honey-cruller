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
  stripeId: string;
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
  stripeId: string;
  // number: string;
  // exp_month: string;
  // exp_year: string;
  // cvc: string;
  card: any;
}
