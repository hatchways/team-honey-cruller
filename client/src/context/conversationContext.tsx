import { FunctionComponent, createContext, useState, useEffect, useContext } from 'react';
import { getOneConvo } from '../helpers/APICalls/conversations';
import { Message, User } from '../interface/User';
import { OtherUser } from '../interface/Convo';
import { useAuth } from '../context/useAuthContext';

interface ConvoContext {
  convo?: Message[];
  setFriendId: (id: string) => void;
  recipient: OtherUser;
}

export const ConversationContext = createContext<ConvoContext>({
  convo: [],
  setFriendId: (id: string) => null,
  recipient: {
    _id: '',
    profilePic: '',
    username: '',
  },
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [convo, setConvo] = useState<Message[]>();
  const [recipient, setRecipient] = useState<OtherUser>({
    _id: '',
    profilePic: '',
    username: '',
  });
  const [friendId, setFriendId] = useState<string>();
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (friendId) {
      setConvo([]);
      setRecipient({
        _id: '',
        profilePic: '',
        username: '',
      });
      getOneConvo(friendId)
        .then((res) => {
          console.log(res);
          if ('username' in res) {
            setRecipient(res);
          } else {
            setConvo(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [friendId]);

  return (
    <ConversationContext.Provider value={{ convo, setFriendId, recipient }}>{children}</ConversationContext.Provider>
  );
};

export function useConvoContext(): ConvoContext {
  return useContext(ConversationContext);
}
