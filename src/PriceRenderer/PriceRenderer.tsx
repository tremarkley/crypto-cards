import { StyleSheet, css } from "aphrodite";

interface PriceRendererProps {
  currentPrice: number;
  priceChangePercent: number;
}

export const PriceRenderer = ({
  currentPrice,
  priceChangePercent,
}: PriceRendererProps) => {
  return (
    <div>
      <div>${currentPrice.toLocaleString()}</div>
      <div>
        {priceChangePercent > 0 ? "+" : ""}
        {priceChangePercent.toLocaleString()}%
      </div>
    </div>
  );
};

const styles = StyleSheet.create({});
