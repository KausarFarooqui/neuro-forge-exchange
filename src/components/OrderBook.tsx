
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface OrderBookEntry {
  price: number;
  quantity: number;
  total: number;
}

interface OrderBookProps {
  symbol: string;
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
  lastPrice: number;
}

const OrderBook = ({ symbol, bids, asks, lastPrice }: OrderBookProps) => {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          Order Book - {symbol}
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 divide-x divide-slate-700">
          {/* Bids */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-green-400 font-medium">Bids</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-xs text-slate-400 mb-2">
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {bids.slice(0, 10).map((bid, index) => (
                <div key={index} className="grid grid-cols-3 text-xs py-1 hover:bg-slate-800/30">
                  <span className="text-green-400 font-mono">${bid.price.toFixed(2)}</span>
                  <span className="text-white font-mono">{bid.quantity}</span>
                  <span className="text-slate-300 font-mono">${bid.total.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Asks */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-medium">Asks</span>
            </div>
            <div className="space-y-1">
              <div className="grid grid-cols-3 text-xs text-slate-400 mb-2">
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
              </div>
              {asks.slice(0, 10).map((ask, index) => (
                <div key={index} className="grid grid-cols-3 text-xs py-1 hover:bg-slate-800/30">
                  <span className="text-red-400 font-mono">${ask.price.toFixed(2)}</span>
                  <span className="text-white font-mono">{ask.quantity}</span>
                  <span className="text-slate-300 font-mono">${ask.total.toFixed(0)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Last Price */}
        <div className="border-t border-slate-700 p-4">
          <div className="text-center">
            <span className="text-slate-400 text-sm">Last Price: </span>
            <span className="text-white font-bold text-lg">${lastPrice.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderBook;
