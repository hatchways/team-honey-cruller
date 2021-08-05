import { useState, useEffect, useContext, createContext, FunctionComponent, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification } from '../interface/User';

interface ISocketContext {
  socket: Socket | undefined;
  initSocket: () => void;
  socketNotification?: Notification;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  initSocket: () => null,
  socketNotification: undefined,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [socketNotification, setSocketNotification] = useState<Notification>();

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
    socket?.on("receive-message", (data) => {
      console.log('client', data);
      // const con = createMessage(data.senderId, data.receiverId, data.message);
      // if (con && convo) convo.push(con);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SocketContext.Provider value={{ socket, initSocket }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
