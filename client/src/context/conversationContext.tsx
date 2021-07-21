import { FunctionComponent, createContext, useState, useEffect, useContext } from 'react';
import { getOneConvo } from '../helpers/APICalls/conversations';
import { Message } from '../interface/User';

interface ConvoContext {
  convo?: Message[];
  setFriendId: (id: string) => void;
}

export const ConversationContext = createContext<ConvoContext>({
  convo: [],
  setFriendId: (id: string) => null,
});

export const ConversationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [convo, setConvo] = useState<Message[]>();
  const [friendId, setFriendId] = useState<string>();

  useEffect(() => {
    if (friendId) {
      getOneConvo(friendId)
        .then((res: Message[]) => {
          if (res) {
            // MAY NEED TO MAP THROUGH DATA TO GET CORRECT DATA STRUCTURE BEFORE SETTING STATE WITH IT
            setConvo(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [friendId]);

  return <ConversationContext.Provider value={{ convo, setFriendId }}>{children}</ConversationContext.Provider>;
};

export function useConvoContext(): ConvoContext {
  return useContext(ConversationContext);
}
