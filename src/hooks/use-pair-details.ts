import { useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

export const usePairDetails = () => {
  const location = useLocation();
  const symbol = location.pathname.split('/').at(-1);

  const { data: pair } = useQuery({
    queryKey: [symbol],
    queryFn: async () => {
      const res = await fetch(`/api/v1/pubticker/${symbol}`);
      return (await res.json()) as Record<string, number>;
    },
  });

  return {
    tickerName: symbol || '',
    lastPrice: pair?.last_price,
    high: pair?.high,
    low: pair?.low,
  };
};
