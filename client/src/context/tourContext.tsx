import { FunctionComponent, createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './useAuthContext';

interface Tour {
  open: boolean;
  setOpen: (ok: boolean) => void;
}

export const TourContext = createContext<Tour>({
  open: false,
  setOpen: (ok: boolean) => undefined,
});

export const TourProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { loggedInUser } = useAuth();

  useEffect(() => {
    if (loggedInUser?.username === 'stanleythemanly') {
      setOpen(true);
    }
  }, [loggedInUser]);

  return <TourContext.Provider value={{ open, setOpen }}>{children}</TourContext.Provider>;
};

export function useTourContext(): Tour {
  return useContext(TourContext);
}
