import { useState, useEffect, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification, Message } from '../interface/User';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  socketNotification?: Notification;
  message?: Message;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  socketNotification: undefined,
  message: undefined,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [socketNotification, setSocketNotification] = useState<Notification>();
  const [message, setMessage] = useState<Message>();

  const initSocket = useCallback(() => {
    console.log('trying to connect');
    setSocket(
      io('/', {
        withCredentials: true,
      }),
    );
  }, []);

  useEffect(() => {
    socket?.on('getNotification', (notification) => {
      setSocketNotification(notification);
    });
  });

  useEffect(() => {
    socket?.on('receive-message', (data) => {
      setMessage(data);
    });
  });

  return <SocketContext.Provider value={{ socket, initSocket, message }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
