import axios from "axios";
import React, { useEffect, useState } from "react";
import { MarketCards } from "./MarketCards/MarketCards";
import { CoinGeckoMarket, CoinGeckoResponse } from "./types";

function App() {
  const [markets, setMarkets] = useState<CoinGeckoMarket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarkets() {
      setLoading(true);
      const { data } = await axios.get<any, CoinGeckoResponse>(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h&per_page=10&page=1&sparkline=true"
      );
      setMarkets(data);
      setLoading(false);
    }
    fetchMarkets();
  }, []);

  return (
    <div className="App">
      {loading ? (
        <span>Loading Markets</span>
      ) : (
        <MarketCards markets={markets} />
      )}
    </div>
  );
}

export default App;
