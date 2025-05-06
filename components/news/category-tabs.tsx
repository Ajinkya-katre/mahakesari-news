"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NewsCategories } from '@/lib/constants'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function CategoryTabs() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState(
    pathname.startsWith('/category/') 
      ? pathname.split('/').pop() || 'all'
      : 'all'
  )

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">News Categories</h2>
        <Link 
          href="/categories" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="overflow-x-auto pb-2 -mx-4 px-4">
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className={cn(
            "h-9 w-full bg-transparent justify-start",
            "border-b rounded-none p-0 overflow-x-auto flex-nowrap"
          )}>
            <TabsTrigger 
              value="all" 
              className={cn(
                "data-[state=active]:bg-transparent rounded-none h-9 px-4",
                "data-[state=active]:shadow-none border-b-2 border-transparent",
                "data-[state=active]:border-primary font-medium"
              )}
              asChild
            >
              <Link href="/">All</Link>
            </TabsTrigger>
            
            {NewsCategories.map((category) => (
              <TabsTrigger
                key={category.value}
                value={category.value}
                className={cn(
                  "data-[state=active]:bg-transparent rounded-none h-9 px-4",
                  "data-[state=active]:shadow-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary font-medium whitespace-nowrap"
                )}
                asChild
              >
                <Link href={`/category/${category.value}`}>{category.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}