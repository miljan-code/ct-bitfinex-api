import { Link } from 'react-router-dom';

import { usePriceData } from '@/hooks/use-price-data';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Home = () => {
  const { tickers } = usePriceData();

  return (
    <Table className="mt-6">
      {!tickers.length && <TableCaption>Data is loading...</TableCaption>}
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead className="text-right">Last</TableHead>
          <TableHead className="text-right">Change</TableHead>
          <TableHead className="text-right">Change Percent</TableHead>
          <TableHead className="text-right">High</TableHead>
          <TableHead className="text-right">Low</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickers.map(ticker => (
          <TableRow key={ticker.chanId}>
            <TableCell className="font-medium">
              <Link to={`/pairs/${ticker.tickerName}`}>
                {ticker.tickerName}
              </Link>
            </TableCell>
            <TableCell className="text-right">{ticker.lastPrice}</TableCell>
            <TableCell className="text-right">{ticker.change}</TableCell>
            <TableCell className="text-right">
              {ticker.changeRelative! < 0
                ? ticker.changeRelative?.toFixed(2)
                : `+${ticker.changeRelative?.toFixed(2)}`}
              %
            </TableCell>
            <TableCell className="text-right">{ticker.high}</TableCell>
            <TableCell className="text-right">{ticker.low}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
