import { User } from '../interface/User';

const mockLoggedInUser: User = {
  email: 'stanley@gmail.com',
  username: 'stanleythemanly',
  profilePic: '',
  artist: true,
  artwork: [],
  contests: [
    {
      title: 'My retirement tattoo',
      description: 'I am retiring and would like to celebrate with a cool tattoo',
      price: 200,
      endDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          images: [],
          description: 'Congratulations on retiring. I have the perfect tattoo for you',
          artistName: 'Princess Peach',
          artistId: '987654321xyz',
        },
      ],
    },
  ],
  conversations: [
    {
      room: '',
      messages: [
        {
          senderId: '',
          senderName: '',
          senderPic: '',
          recipientId: '',
          recipientName: '',
          recipientPic: '',
        },
      ],
    },
  ],
};

const mockOtherUser1: User = {
  email: 'dwight@gmail.com',
  username: 'dwightk',
  profilePic: '',
  artist: true,
  artwork: [],
  contests: [
    {
      title: 'my new favorite tattoo',
      description: 'I am looking for a cool island tattoo to warm my icy heart.',
      price: 200,
      endDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          images: [],
          description:
            'Your tattoo would be very similar to the ones in these pictures. We could do color or just black',
          artistName: 'Biker Jim',
          artistId: '123456789abc',
        },
      ],
    },
  ],
  conversations: [
    {
      room: '',
      messages: [
        {
          senderId: '',
          senderName: '',
          senderPic: '',
          recipientId: '',
          recipientName: '',
          recipientPic: '',
        },
      ],
    },
  ],
};

const mockOtherUser2: User = {
  email: 'oscar@gmail.com',
  username: 'oscar',
  profilePic: '',
  artist: false,
  artwork: [],
  contests: [
    {
      title: 'Grouchy tattoo',
      description: 'I need a tattoo to show people how grouchy I am',
      price: 250,
      endDate: 'Sun Sep 01 2021 00:00:00 GMT+0200',
      submissions: [
        {
          images: [],
          description: "Grouchy tattoos are my specialty. I think you'll like what I have in mind for you",
          artistName: 'Cookie Monster',
          artistId: '123456789xyz',
        },
      ],
    },
  ],
  conversations: [
    {
      room: '',
      messages: [
        {
          senderId: '',
          senderName: '',
          senderPic: '',
          recipientId: '',
          recipientName: '',
          recipientPic: '',
        },
      ],
    },
  ],
};

const mockOtherUser3: User = {
  email: 'kevin@gmail.com',
  username: 'malonescones',
  profilePic: '',
  artist: false,
  artwork: [],
  contests: [
    {
      title: 'my new favorite tattoo',
      description: 'I am looking for a tattoo that expresses how hungry I am',
      price: 300,
      endDate: 'Mon Sep 02 2021 00:00:00 GMT+0200',
      submissions: [
        {
          images: [],
          description: 'I love food too and I have the perfect tattoo for you',
          artistName: 'Prison Mike',
          artistId: '987654321abc',
        },
      ],
    },
  ],
  conversations: [
    {
      room: '',
      messages: [
        {
          senderId: '',
          senderName: '',
          senderPic: '',
          recipientId: '',
          recipientName: '',
          recipientPic: '',
        },
      ],
    },
  ],
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
