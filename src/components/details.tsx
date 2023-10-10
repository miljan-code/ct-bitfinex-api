import { usePairData } from '@/hooks/use-pair-data';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const Details = () => {
  const { pair } = usePairData();

  return (
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
  );
};
