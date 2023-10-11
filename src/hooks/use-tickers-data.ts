import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';

import { initSocket } from '@/lib/socket';
import { getPair } from '@/lib/queries';

export interface Ticker {
  tickerName: string;
  chanId: number;
  change?: number;
  changeRelative?: number;
  lastPrice?: number;
  high?: number;
  low?: number;
}

export const useTickersData = () => {
  const [tickers, setTickers] = useState<Ticker[]>([]);

  const client = useQueryClient();

  const { data: symbols } = useQuery({
    queryKey: ['getSymbols'],
    queryFn: async () => {
      const res = await fetch('/api/v1/symbols');
      return (await res.json()) as string[];
    },
    onSuccess(data) {
      const symbols = data
        .slice(0, 5)
        .map(symbol => `t${symbol.toUpperCase()}`);
      initSocket({ symbols, setTickers });

      symbols.forEach(symbol => {
        const key = symbol.slice(1);
        client.prefetchQuery([key], () => getPair(key));
      });
    },
  });

  return { tickers, symbols };
};
