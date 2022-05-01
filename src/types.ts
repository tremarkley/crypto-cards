export interface CoinGeckoMarket {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h_in_currency: number;
  total_volume: number;
  sparkline_in_7d: {
    price: number[];
  };
}

export interface CoinGeckoResponse {
  data: CoinGeckoMarket[];
}
