import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingDown, TrendingUp, Minus, Calendar, DollarSign, BarChart3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { formatPrice, formatDate } from "@/lib/api";

interface PriceHistoryEntry {
  date: string;
  price: number;
  change?: number;
  changePercent?: number;
  reason?: string;
}

interface PriceHistoryProps {
  carId: number;
  currentPrice: string;
  showChart?: boolean;
}

export default function PriceHistory({ carId, currentPrice, showChart = true }: PriceHistoryProps) {
  const [timeRange, setTimeRange] = useState("6months");

  // Mock price history data - in real app, this would come from API
  const generatePriceHistory = (currentPriceNum: number): PriceHistoryEntry[] => {
    const history: PriceHistoryEntry[] = [];
    const now = new Date();
    const months = timeRange === "3months" ? 3 : timeRange === "6months" ? 6 : 12;
    
    let price = currentPriceNum + (Math.random() * 5000 - 2500); // Starting price variation
    
    for (let i = months; i >= 0; i--) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      
      if (i > 0) {
        // Random price changes over time
        const change = Math.random() * 2000 - 1000;
        price += change;
        
        const prevPrice = history.length > 0 ? history[history.length - 1].price : price;
        const changeAmount = price - prevPrice;
        const changePercent = ((changeAmount / prevPrice) * 100);
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: Math.round(price),
          change: Math.round(changeAmount),
          changePercent: Math.round(changePercent * 100) / 100,
          reason: Math.abs(changeAmount) > 500 ? 
            (changeAmount > 0 ? "Market demand increase" : "Price adjustment") : undefined
        });
      } else {
        // Current price
        const prevPrice = history.length > 0 ? history[history.length - 1].price : currentPriceNum;
        const changeAmount = currentPriceNum - prevPrice;
        const changePercent = ((changeAmount / prevPrice) * 100);
        
        history.push({
          date: date.toISOString().split('T')[0],
          price: currentPriceNum,
          change: Math.round(changeAmount),
          changePercent: Math.round(changePercent * 100) / 100,
          reason: "Current listing price"
        });
      }
    }
    
    return history;
  };

  const currentPriceNum = parseFloat(currentPrice.replace(/[^0-9.-]+/g, ""));
  const priceHistory = generatePriceHistory(currentPriceNum);
  
  const latestChange = priceHistory[priceHistory.length - 1];
  const previousPrice = priceHistory[priceHistory.length - 2];
  
  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-red-500" />;
    if (change < 0) return <TrendingDown className="h-4 w-4 text-green-500" />;
    return <Minus className="h-4 w-4 text-gray-500" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-red-500";
    if (change < 0) return "text-green-500";
    return "text-gray-500";
  };

  const getMarketInsight = () => {
    const totalChange = latestChange.price - priceHistory[0].price;
    const totalChangePercent = ((totalChange / priceHistory[0].price) * 100);
    
    if (Math.abs(totalChangePercent) < 2) {
      return {
        type: "stable",
        message: "Price has remained stable over the selected period",
        color: "bg-blue-50 text-blue-700 border-blue-200"
      };
    } else if (totalChangePercent > 5) {
      return {
        type: "increase",
        message: "Price has increased significantly - consider acting quickly",
        color: "bg-red-50 text-red-700 border-red-200"
      };
    } else if (totalChangePercent < -5) {
      return {
        type: "decrease",
        message: "Great opportunity - price has dropped below recent highs",
        color: "bg-green-50 text-green-700 border-green-200"
      };
    } else {
      return {
        type: "moderate",
        message: "Price shows moderate fluctuation within normal range",
        color: "bg-gray-50 text-gray-700 border-gray-200"
      };
    }
  };

  const insight = getMarketInsight();

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            Price History
          </CardTitle>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Current Price & Change */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Current Price</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">{formatPrice(currentPrice)}</p>
          </div>
          
          {previousPrice && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Last Change</span>
              </div>
              <div className="flex items-center gap-2">
                {getTrendIcon(latestChange.change || 0)}
                <span className={`font-semibold ${getTrendColor(latestChange.change || 0)}`}>
                  {latestChange.change && latestChange.change !== 0 ? (
                    <>
                      {latestChange.change > 0 ? '+' : ''}${Math.abs(latestChange.change).toLocaleString()}
                      <span className="text-sm ml-1">
                        ({latestChange.changePercent && latestChange.changePercent > 0 ? '+' : ''}{latestChange.changePercent}%)
                      </span>
                    </>
                  ) : (
                    'No change'
                  )}
                </span>
              </div>
            </div>
          )}
          
          <div className={`p-4 rounded-lg border ${insight.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="h-4 w-4" />
              <span className="text-sm font-medium">Market Insight</span>
            </div>
            <p className="text-sm">{insight.message}</p>
          </div>
        </div>

        {/* Price Chart */}
        {showChart && (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  className="text-xs"
                />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                  className="text-xs"
                />
                <Tooltip 
                  formatter={(value: number) => [formatPrice(value.toString()), "Price"]}
                  labelFormatter={(date) => new Date(date).toLocaleDateString()}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#2563eb" 
                  strokeWidth={2}
                  dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#1d4ed8" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Recent Price Changes */}
        <div>
          <h4 className="font-semibold mb-3">Recent Price Changes</h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {priceHistory.slice(-5).reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="text-sm text-gray-600">
                    {formatDate(entry.date)}
                  </div>
                  {entry.reason && (
                    <Badge variant="outline" className="text-xs">
                      {entry.reason}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{formatPrice(entry.price.toString())}</span>
                  {entry.change !== undefined && entry.change !== 0 && (
                    <div className={`flex items-center gap-1 text-sm ${getTrendColor(entry.change)}`}>
                      {getTrendIcon(entry.change)}
                      <span>
                        {entry.change > 0 ? '+' : ''}${Math.abs(entry.change).toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}