import { FunctionComponent, createContext, useState, useEffect } from 'react';
import { getNotification } from '../helpers/APICalls/notification';
import { Notification } from '../interface/User';

interface NotificationContext {
  notifications?: Notification[];
  setId: (id: number) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: [],
  setId: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>();
  const [id, setId] = useState<number>();
  useEffect(() => {
    async function getAll() {
      const allNotifications = await getNotification();
      if (allNotifications) {
        setNotifications(allNotifications);
      } else {
        new Error('Notifications not found');
      }
    }
    getAll();
  }, [id]);

  return <NotificationContext.Provider value={{ notifications, setId }}>{children}</NotificationContext.Provider>;
};
