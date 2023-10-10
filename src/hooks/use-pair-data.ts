import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { type Ticker } from './use-price-data';

type Pair = Pick<Ticker, 'tickerName' | 'lastPrice' | 'high' | 'low'>;

export const usePairData = () => {
  const [pair, setPair] = useState<Pair>({} as Pair);

  const location = useLocation();
  const symbol = location.pathname.split('/').at(-1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/v1/pubticker/${symbol}`);
      const data = await res.json();

      setPair({
        tickerName: symbol || '',
        lastPrice: data.last_price,
        high: data.high,
        low: data.low,
      });
    };

    fetchData();
  }, [symbol]);

  return { pair };
};
