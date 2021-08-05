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
  _id: string;
  title: string;
  description: string;
  prizeAmount: number;
  images: string[];
  deadlineDate: string;
  dateCreated: string;
  userId: string;
  ownerProfilePic: string;
  ownerName: string;
  submissions: Submission[];
  active: boolean;
}

export interface Submission {
  _id: string;
  contest: string;
  images: string[];
  artistName: string;
  artistId: string;
  artistPic: string;
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

interface WinningUser {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
}

export interface Winner {
  _id: string;
  contestOwner: WinningUser;
  winningArtist: WinningUser;
  winningPic: string;
  title: string;
  description: string;
  prizeAmount: number;
  error?: { message: string };
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

export interface Review {
  _id: string;
  error: string;
  rating: number;
  text: string;
  reviewerId: { profilePic :string, username :string};
}

export interface submissionByArtist {
  _id: string;
  contest: { title: string};
  created_at: string;
}