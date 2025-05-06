import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MarketOverview from "@/components/stocks/market-overview";
import { Separator } from "@/components/ui/separator";

export default function StocksPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Stock Market Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time market data and financial insights
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Data source:</span>
          <span className="font-medium">Market API</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <MarketOverview />
        
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Market Performance</CardTitle>
            <CardDescription>
              Major indices performance (last 7 days)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-muted/40 rounded-md">
              <p className="text-muted-foreground text-sm">
                Stock chart visualization would appear here
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="top-gainers" className="mb-8">
        <TabsList>
          <TabsTrigger value="top-gainers">Top Gainers</TabsTrigger>
          <TabsTrigger value="top-losers">Top Losers</TabsTrigger>
          <TabsTrigger value="most-active">Most Active</TabsTrigger>
          <TabsTrigger value="watch-list">My Watchlist</TabsTrigger>
        </TabsList>
        <TabsContent value="top-gainers" className="space-y-4 pt-4">
          <StockTable type="gainers" />
        </TabsContent>
        <TabsContent value="top-losers" className="space-y-4 pt-4">
          <StockTable type="losers" />
        </TabsContent>
        <TabsContent value="most-active" className="space-y-4 pt-4">
          <StockTable type="active" />
        </TabsContent>
        <TabsContent value="watch-list" className="space-y-4 pt-4">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <p className="text-muted-foreground mb-4">
              You need to be signed in to view your watchlist
            </p>
            <Link 
              href="/login"
              className="py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium"
            >
              Sign In
            </Link>
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sector Performance</CardTitle>
            <CardDescription>How different market sectors are performing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Technology', 'Healthcare', 'Financial', 'Energy', 'Consumer'].map((sector) => (
                <div key={sector} className="flex items-center justify-between">
                  <span>{sector}</span>
                  <div className="w-2/3 bg-muted/50 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${Math.random() * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">
                    {(Math.random() * 4 - 2).toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Market News</CardTitle>
            <CardDescription>Latest financial updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                "Federal Reserve signals interest rate policy shift",
                "Tech stocks rally on strong earnings reports",
                "Oil prices stabilize after supply concerns ease",
                "Manufacturing sector shows signs of growth",
                "Retail sales exceed analyst expectations"
              ].map((headline, i) => (
                <div key={i}>
                  <Link href="#" className="hover:text-primary transition-colors">
                    <h3 className="font-medium mb-1">{headline}</h3>
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {Math.floor(Math.random() * 5) + 1} hours ago
                  </p>
                  {i < 4 && <Separator className="mt-3" />}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trading View</CardTitle>
          <CardDescription>Interactive stock chart for technical analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] flex items-center justify-center bg-muted/40 rounded-md">
            <p className="text-muted-foreground text-sm">
              Interactive trading chart would be embedded here
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StockTable({ type }: { type: 'gainers' | 'losers' | 'active' }) {
  const stocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 212.45, change: 3.25, volume: '34.5M' },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 425.68, change: 2.12, volume: '28.3M' },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 187.23, change: 1.87, volume: '22.1M' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 176.35, change: 1.45, volume: '19.8M' },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 492.10, change: 4.32, volume: '17.6M' },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 245.67, change: -2.18, volume: '33.2M' },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 1032.45, change: 5.67, volume: '42.9M' },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 187.23, change: -0.76, volume: '12.4M' },
  ]

  // Adjust data based on table type
  const adjustedStocks = [...stocks].map(stock => {
    if (type === 'gainers') {
      return { ...stock, change: Math.abs(stock.change) }
    }
    if (type === 'losers') {
      return { ...stock, change: -Math.abs(stock.change) }
    }
    return stock
  })

  // Sort based on the table type
  const sortedStocks = adjustedStocks.sort((a, b) => {
    if (type === 'gainers') return b.change - a.change
    if (type === 'losers') return a.change - b.change
    return Number(b.volume.replace(/[^0-9.-]+/g, "")) - Number(a.volume.replace(/[^0-9.-]+/g, ""))
  })

  return (
    <div className="overflow-x-auto border rounded-lg">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left py-3 px-4 font-medium">Symbol</th>
            <th className="text-left py-3 px-4 font-medium">Name</th>
            <th className="text-right py-3 px-4 font-medium">Price</th>
            <th className="text-right py-3 px-4 font-medium">Change</th>
            <th className="text-right py-3 px-4 font-medium">Volume</th>
          </tr>
        </thead>
        <tbody>
          {sortedStocks.map((stock) => (
            <tr key={stock.symbol} className="border-t hover:bg-muted/30 transition-colors">
              <td className="py-3 px-4 font-medium">{stock.symbol}</td>
              <td className="py-3 px-4 text-muted-foreground">{stock.name}</td>
              <td className="py-3 px-4 text-right">
                ${stock.price.toFixed(2)}
              </td>
              <td className={`py-3 px-4 text-right ${stock.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%
              </td>
              <td className="py-3 px-4 text-right text-muted-foreground">
                {stock.volume}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}