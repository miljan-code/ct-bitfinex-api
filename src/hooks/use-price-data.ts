import { useEffect, useState } from 'react';

import { initSocket } from '@/lib/socket';

export interface Ticker {
  tickerName: string;
  chanId: number;
  change?: number;
  changeRelative?: number;
  lastPrice?: number;
  high?: number;
  low?: number;
}

export const usePriceData = () => {
  const [symbols, setSymbols] = useState<string[]>([]);
  const [tickers, setTickers] = useState<Ticker[]>([]);

  useEffect(() => {
    const fetchSymbols = async () => {
      const res = await fetch('/api');
      const symbols = (await res.json()) as string[];

      const formatedSymbols = symbols
        .slice(0, 5)
        .map(symbol => `t${symbol.toUpperCase()}`);

      setSymbols(formatedSymbols);
    };

    fetchSymbols();
  }, []);

  useEffect(() => {
    initSocket({ symbols, setTickers });
  }, [symbols]);

  return { tickers };
};
