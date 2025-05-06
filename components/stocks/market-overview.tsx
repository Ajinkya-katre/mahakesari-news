"use client"

import { useEffect, useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card'
import { 
  ArrowDownIcon, 
  ArrowUpIcon,
  RefreshCcwIcon 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { StockMarketIndices } from '@/lib/constants'
import { cn } from '@/lib/utils'

interface MarketData {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  isLoading?: boolean
}

export default function MarketOverview() {
  const [marketData, setMarketData] = useState<MarketData[]>(
    StockMarketIndices.map(index => ({
      ...index,
      price: 0,
      change: 0,
      changePercent: 0,
      isLoading: true
    }))
  )
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate data loading and updates
  useEffect(() => {
    const loadMarketData = () => {
      setIsRefreshing(true)
      
      // Simulate API call delay
      setTimeout(() => {
        const updatedData = StockMarketIndices.map(index => {
          // Generate realistic-looking random data
          const basePrice = index.symbol === '^DJI' ? 38000 : 
                           index.symbol === '^GSPC' ? 5200 : 
                           index.symbol === '^IXIC' ? 16500 : 
                           index.symbol === '^FTSE' ? 8100 : 7500
                           
          const randomFactor = (Math.random() * 2 - 1) * 0.01 // -1% to +1%
          const price = basePrice * (1 + randomFactor)
          const change = basePrice * randomFactor
          const changePercent = randomFactor * 100
          
          return {
            ...index,
            price,
            change,
            changePercent,
            isLoading: false
          }
        })
        
        setMarketData(updatedData)
        setLastUpdated(new Date())
        setIsRefreshing(false)
      }, 1500)
    }
    
    loadMarketData()
    
    // Auto refresh every 60 seconds
    const intervalId = setInterval(loadMarketData, 60000)
    
    return () => clearInterval(intervalId)
  }, [])
  
  const handleRefresh = () => {
    // Reset loading state
    setMarketData(prev => 
      prev.map(item => ({ ...item, isLoading: true }))
    )
    
    // Simulate refresh delay
    setTimeout(() => {
      const updatedData = marketData.map(item => {
        const randomChange = (Math.random() * 2 - 1) * 0.005 // Small random change
        const newPrice = item.price * (1 + randomChange)
        const newChange = newPrice - (item.price - item.change)
        const newChangePercent = (newChange / (item.price - item.change)) * 100
        
        return {
          ...item,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          isLoading: false
        }
      })
      
      setMarketData(updatedData)
      setLastUpdated(new Date())
    }, 1000)
  }
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Market Overview</CardTitle>
            <CardDescription>
              Last updated: {lastUpdated.toLocaleTimeString()}
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcwIcon className={cn(
              "h-4 w-4 mr-1",
              isRefreshing && "animate-spin"
            )} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {marketData.map((index) => (
            <div 
              key={index.symbol} 
              className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
            >
              <div className="font-medium">{index.name}</div>
              <div className="flex items-center gap-3">
                {index.isLoading ? (
                  <>
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                  </>
                ) : (
                  <>
                    <div className="tabular-nums text-right w-24">
                      {index.price.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </div>
                    <div className={cn(
                      "flex items-center gap-1 tabular-nums w-24 text-right",
                      index.change > 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {index.change > 0 ? (
                        <ArrowUpIcon className="h-3 w-3" />
                      ) : (
                        <ArrowDownIcon className="h-3 w-3" />
                      )}
                      <span>
                        {Math.abs(index.changePercent).toFixed(2)}%
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}