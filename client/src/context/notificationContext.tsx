import { FunctionComponent, createContext, useState, useEffect, useContext } from 'react';
import { getNotification } from '../helpers/APICalls/notification';
import { Notification } from '../interface/User';
import { SocketContext } from './useSocketContext';

interface NotificationContext {
  notifications: Notification[];
  setNotifications: (notification: Notification[]) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: [],
  setNotifications: () => undefined,
});

export const NotificationProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
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

  useEffect(() => {
    if (socketNotification) {
      const updatedNotification = notifications.length ? [...notifications, socketNotification] : [socketNotification];
      setNotifications(updatedNotification);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socketNotification]);

  notifications?.length &&
    notifications?.sort((a: { createdAt: string | number | Date }, b: { createdAt: string | number | Date }) => {
      return new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf();
    });

  return (
    <NotificationContext.Provider value={{ notifications, setNotifications }}>{children}</NotificationContext.Provider>
  );
};
