import { useContext } from 'react';
import { FunctionComponent, createContext, useState, useEffect } from 'react';
import { getNotification } from '../helpers/APICalls/notification';
import { Notification } from '../interface/User';
import { SocketContext } from './useSocketContext';

interface NotificationContext {
  notifications?: Notification[];
  setNotifications: (notification: Notification[] | undefined) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: [],
  setNotifications: () => null,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>();
  const socketNotification = useContext(SocketContext).socketNotification;

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
  }, []);

  //notification coming from socket server 
  socketNotification ? notifications?.push(socketNotification) : notifications;

  notifications?.length &&
    notifications?.sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationContext.Provider>
  );
};
