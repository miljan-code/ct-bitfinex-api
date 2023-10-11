import { useContext } from 'react';

import { AppContext } from '@/context/context-provider';
import { usePairDetails } from '@/hooks/use-pair-details';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from './ui/button';

export const Details = () => {
  const { isSigned, favorites, setFavorites } = useContext(AppContext);
  const pair = usePairDetails();

  const addToFavoritesHandler = () => {
    setFavorites([...favorites, pair.tickerName]);
  };

  const removeFromFavoritesHandler = () => {
    const arr = [...favorites];
    const index = arr.findIndex(item => item === pair.tickerName);
    arr.splice(index, 1);
    setFavorites(arr);
  };

  const pairInFavs = favorites.some(item => item === pair.tickerName);

  return (
    <div className="space-y-2">
      <Table className="mt-6">
        {!pair.tickerName && <TableCaption>Data is loading...</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead className="text-right">Last price</TableHead>
            <TableHead className="text-right">High</TableHead>
            <TableHead className="text-right">Low</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pair.tickerName && (
            <TableRow>
              <TableCell className="font-medium">{pair.tickerName}</TableCell>
              <TableCell className="text-right">{pair.lastPrice}</TableCell>
              <TableCell className="text-right">{pair.high}</TableCell>
              <TableCell className="text-right">{pair.low}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isSigned && !pairInFavs && (
        <Button onClick={addToFavoritesHandler}>Add to favorites</Button>
      )}
      {isSigned && pairInFavs && (
        <Button onClick={removeFromFavoritesHandler} variant="destructive">
          Remove from favorites
        </Button>
      )}
    </div>
  );
};
