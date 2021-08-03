import { useState, useContext, createContext, FunctionComponent, useCallback, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { Notification } from '../interface/User';

interface ISocketContext {
  socket: Socket | undefined;
  //initSocket: () => void;
  socketNotification: Notification | undefined;
}

export const SocketContext = createContext<ISocketContext>({
  socket: undefined,
  //initSocket: () => null,
  socketNotification: undefined,
});

export const SocketProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [socketNotification, setSocketNotification] = useState<Notification>();

  useEffect(() => {
    setSocket(io('/'));
  }, []);

  useEffect(() => {
    socket?.on('getNotification', (notification) => {
      setSocketNotification(notification);
    });
  }, [socket]);
  
  return <SocketContext.Provider value={{ socket, socketNotification }}>{children}</SocketContext.Provider>;
};

export function useSocket(): ISocketContext {
  return useContext(SocketContext);
}
