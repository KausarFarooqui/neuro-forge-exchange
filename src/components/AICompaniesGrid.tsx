
import AICompanyCard from './AICompanyCard';

interface AICompany {
  id: string;
  name: string;
  symbol: string;
  category: string;
  description: string;
  logo: string;
}

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
}

interface AICompaniesGridProps {
  companies: AICompany[];
  stockData: StockData[];
  onTradingClick: () => void;
}

const AICompaniesGrid = ({ companies, stockData, onTradingClick }: AICompaniesGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {companies.map((company) => {
        const stock = stockData.find(s => s.symbol === company.symbol);
        if (!stock) return null;

        return (
          <AICompanyCard
            key={company.id}
            company={company}
            stockData={stock}
            onBuyClick={onTradingClick}
            onSellClick={onTradingClick}
          />
        );
      })}
    </div>
  );
};

export default AICompaniesGrid;
