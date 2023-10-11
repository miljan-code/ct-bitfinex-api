export const getPair = async (symbol: string) => {
  const res = await fetch(`/api/v1/pubticker/${symbol}`);
  return (await res.json()) as Record<string, number>;
};
