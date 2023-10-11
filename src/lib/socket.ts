import { type Ticker } from '@/hooks/use-tickers-data';

interface InitSocketOpts {
  symbols: string[];
  setTickers: React.Dispatch<React.SetStateAction<Ticker[]>>;
}

export const initSocket = ({ symbols, setTickers }: InitSocketOpts) => {
  const socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  socket.onopen = () => {
    symbols.forEach(symbol => {
      const event = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol,
      });

      socket.send(event);
    });
  };

  const chanIds: string[] = [];

  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    if (data.event && data.event === 'subscribed') {
      setTickers(prevTickers => {
        const tickerAdded = prevTickers.some(
          ticker => ticker.tickerName === data.pair
        );

        if (tickerAdded) return prevTickers;

        chanIds.push(chanId);
        return [...prevTickers, { tickerName: data.pair, chanId: data.chanId }];
      });
    }
    const chanId = data[0];
    const payload = data[1];
    if (!chanId) return;
    if (payload === 'hb' || !payload) return;

    const pair = transformData(chanId, payload);

    setTickers(prevTickers => {
      const tickers = [...prevTickers];
      const tickerIndex = tickers.findIndex(
        ticker => ticker.chanId === pair.chanId
      );
      tickers[tickerIndex] = {
        ...tickers[tickerIndex],
        change: pair.change,
        changeRelative: pair.changeRelative * 100,
        lastPrice: pair.lastPrice,
        high: pair.high,
        low: pair.low,
      };
      return tickers;
    });
  };

  const unsubscribe = () => {
    chanIds.forEach(chanId => {
      const event = JSON.stringify({
        event: 'unsubscribe',
        chanId,
      });

      socket.send(event);
    });
  };

  socket.onclose = () => unsubscribe();
  socket.onerror = () => unsubscribe();
};

function transformData(chanId: number, arr: number[]) {
  const slicedPayload = arr.slice(4);
  slicedPayload.splice(3, 1);
  const [change, changeRelative, lastPrice, high, low] = slicedPayload;
  return { chanId, change, changeRelative, lastPrice, high, low };
}
