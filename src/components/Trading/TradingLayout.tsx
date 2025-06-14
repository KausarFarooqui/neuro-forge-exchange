
import StockChart from '@/components/StockChart';
import OrderBook from '@/components/OrderBook';
import TradeExecution from '@/components/TradeExecution';
import MarketDepth from '@/components/MarketDepth';
import MarketWatchlist from '@/components/Trading/MarketWatchlist';
import QuickTradePanel from '@/components/Trading/QuickTradePanel';

interface TradingLayoutProps {
  selectedSymbol: string;
  chartData: any[];
  displayPrice: number;
  displayChange: number;
  displayChangePercent: number;
  depthData: any[];
  spread: number;
  spreadPercent: number;
  portfolio: any;
  orderBook: any;
  prices: any;
  onTrade: (trade: any) => Promise<{ success: boolean; error?: string }>;
  onSymbolSelect: (symbol: string) => void;
}

const TradingLayout = ({
  selectedSymbol,
  chartData,
  displayPrice,
  displayChange,
  displayChangePercent,
  depthData,
  spread,
  spreadPercent,
  portfolio,
  orderBook,
  prices,
  onTrade,
  onSymbolSelect
}: TradingLayoutProps) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
      {/* Left Column - Chart and Market Depth */}
      <div className="xl:col-span-2 space-y-6">
        <StockChart
          symbol={selectedSymbol}
          data={chartData}
          currentPrice={displayPrice}
          change={displayChange}
          changePercent={displayChangePercent}
        />
        <MarketDepth
          symbol={selectedSymbol}
          depthData={depthData}
          spread={spread}
          spreadPercent={spreadPercent}
        />
      </div>

      {/* Middle Column - Trading Controls */}
      <div className="space-y-6">
        <QuickTradePanel
          symbol={selectedSymbol}
          currentPrice={displayPrice}
          availableBalance={portfolio.cashBalance}
          onTrade={onTrade}
        />
        <TradeExecution
          symbol={selectedSymbol}
          currentPrice={displayPrice}
          availableBalance={portfolio.cashBalance}
          onTrade={onTrade}
        />
      </div>

      {/* Right Column - Market Data and Order Book */}
      <div className="space-y-6">
        <MarketWatchlist
          marketData={prices}
          selectedSymbol={selectedSymbol}
          onSymbolSelect={onSymbolSelect}
        />
        <OrderBook
          symbol={selectedSymbol}
          bids={orderBook.bids}
          asks={orderBook.asks}
          lastPrice={displayPrice}
        />
      </div>
    </div>
  );
};

export default TradingLayout;
