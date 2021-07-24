import { User } from '../interface/User';

const mockLoggedInUser: User = {
  id: 'abc123456',
  email: 'stanley@gmail.com',
  username: 'stanleythemanly',
  profilePic: '',
  artist: true,
  artwork: [],
  activeConvo: [],
  stripeId: '',
  contests: [
    {
      _id: '',
      images: [],
      title: 'My retirement tattoo',
      description: 'I am retiring and would like to celebrate with a cool tattoo',
      prizeAmount: 200,
      dateCreated: 'Sat Aug 21 2021 00:00:00 GMT+0200',
      userId: '123456789',
      deadlineDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          _id: '',
          images: [],
          artistName: 'Princess Peach',
          artistId: '987654321xyz',
          contest: '',
          active: true,
        },
      ],
    },
  ],
  conversations: [
    {
      _id: '54',
      createdAt: '',
      updatedAt: '',
      lastMessage: 'Hey bud',
      recipients: [
        {
          _id: 'abc123457',
          username: 'dwightk',
          profilePic: '',
          email: 'dwight@gmail.com',
        },
        {
          _id: 'abc123456',
          username: 'stanleythemanly',
          profilePic: '',
          email: 'stanley@gmail.com',
        },
      ],
    },
  ],
};

const mockOtherUser1: User = {
  id: 'abc123457',
  email: 'dwight@gmail.com',
  username: 'dwightk',
  profilePic: '',
  artist: true,
  artwork: [],
  stripeId: '',
  activeConvo: [],
  contests: [
    {
      _id: '',
      title: 'my new favorite tattoo',
      images: [],
      description: 'I am looking for a cool island tattoo to warm my icy heart.',
      prizeAmount: 200,
      dateCreated: 'Sat Aug 21 2021 00:00:00 GMT+0200',
      userId: '123456780',
      deadlineDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          _id: '',
          images: [],
          contest: '',
          active: true,
          artistName: 'Biker Jim',
          artistId: '123456789abc',
        },
      ],
    },
  ],
  conversations: [
    {
      _id: '54',
      createdAt: '',
      updatedAt: '',
      lastMessage: 'Hey bud',
      recipients: [
        {
          _id: 'abc123457',
          username: 'dwightk',
          profilePic: '',
          email: 'dwight@gmail.com',
        },
        {
          _id: 'abc123456',
          username: 'stanleythemanly',
          profilePic: '',
          email: 'stanley@gmail.com',
        },
      ],
    },
  ],
};

const mockOtherUser2: User = {
  id: 'abc123458',
  email: 'oscar@gmail.com',
  username: 'oscar',
  profilePic: '',
  artist: false,
  artwork: [],
  stripeId: '',
  activeConvo: [],
  contests: [
    {
      _id: '',
      images: [],
      title: 'Grouchy tattoo',
      description: 'I need a tattoo to show people how grouchy I am',
      prizeAmount: 250,
      dateCreated: 'Sat Aug 21 2021 00:00:00 GMT+0200',
      userId: '123456788',
      deadlineDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          _id: '',
          images: [],
          contest: '',
          active: true,
          artistName: 'Cookie Monster',
          artistId: '123456789xyz',
        },
      ],
    },
  ],
  conversations: [
    {
      _id: '57',
      createdAt: '',
      updatedAt: '',
      lastMessage: 'How are you',
      recipients: [
        {
          _id: 'abc123458',
          username: 'oscar',
          profilePic: '',
          email: 'oscar@gmail.com',
        },
        {
          _id: 'abc123459',
          username: 'malonescones',
          profilePic: '',
          email: 'kevin@gmail.com',
        },
      ],
    },
  ],
};

const mockOtherUser3: User = {
  id: 'abc123459',
  email: 'kevin@gmail.com',
  username: 'malonescones',
  profilePic: '',
  artist: false,
  artwork: [],
  stripeId: '',
  activeConvo: [],
  contests: [
    {
      _id: '',
      images: [],
      title: 'my new favorite tattoo',
      description: 'I am looking for a tattoo that expresses how hungry I am',
      prizeAmount: 300,
      dateCreated: 'Sat Aug 21 2021 00:00:00 GMT+0200',
      userId: '123456787',
      deadlineDate: 'Mon Sep 02 2021 00:00:00 GMT+0200',
      submissions: [
        {
          _id: '',
          images: [],
          contest: '',
          active: true,
          artistName: 'Prison Mike',
          artistId: '987654321abc',
        },
      ],
    },
  ],
  conversations: [
    {
      _id: '57',
      createdAt: '',
      updatedAt: '',
      lastMessage: 'How are you',
      recipients: [
        {
          _id: 'abc123458',
          username: 'oscar',
          profilePic: '',
          email: 'kevin@gmail.com',
        },
        {
          _id: 'abc123459',
          username: 'malonescones',
          profilePic: '',
          email: 'stanley@gmail.com',
        },
      ],
    },
  ],
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
