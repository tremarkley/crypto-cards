import { StyleSheet, css } from "aphrodite";

import { MarketCard } from "../MarketCard/MarketCard";
import { CoinGeckoMarket } from "../types";

interface MarketCardsProps {
  markets: CoinGeckoMarket[];
}

export const MarketCards = ({ markets }: MarketCardsProps) => {
  return (
    <div>
      {markets.map((market) => (
        <MarketCard market={market} key={market.id} />
      ))}
    </div>
  );
};

const styles = StyleSheet.create({});
