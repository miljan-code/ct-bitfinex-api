import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '@/context/context-provider';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Favorites = () => {
  const { tickers, favorites } = useContext(AppContext);

  const favoritePairs = tickers.filter(ticker =>
    favorites.includes(ticker.tickerName)
  );

  return (
    <Table className="mt-6">
      {!favorites.length && (
        <TableCaption>There is no data to show</TableCaption>
      )}
      {favorites.length && !tickers.length ? (
        <TableCaption>Loading data...</TableCaption>
      ) : null}
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
        {favoritePairs.map(ticker => (
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
