import { createContext } from 'react';

import { useLocalStorage } from '@/hooks/use-local-storage';
import { type Ticker, useTickersData } from '@/hooks/use-tickers-data';

interface AppCtx {
  tickers: Ticker[];
  isSigned: boolean;
  setIsSigned: (bool: boolean) => void;
  favorites: string[];
  setFavorites: (arr: string[]) => void;
}

interface ContextProviderProps {
  children: React.ReactNode;
}

export const AppContext = createContext<AppCtx>({} as AppCtx);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [isSigned, setIsSigned] = useLocalStorage('CT__isSigned', false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('CT__favs', []);
  const { tickers } = useTickersData();

  return (
    <AppContext.Provider
      value={{ tickers, isSigned, setIsSigned, favorites, setFavorites }}
    >
      {children}
    </AppContext.Provider>
  );
};
