import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getPair } from '@/lib/queries';

export const usePairDetails = () => {
  const location = useLocation();
  const symbol = location.pathname.split('/').at(-1);

  const { data: pair } = useQuery({
    queryKey: [symbol],
    queryFn: () => getPair(symbol || ''),
  });

  return {
    tickerName: symbol || '',
    lastPrice: pair?.last_price,
    high: pair?.high,
    low: pair?.low,
  };
};
