"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { NewsCategories } from '@/lib/constants'

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-200",
      isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-8">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="flex flex-col gap-6 py-4">
                  <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    MAHAKESARI
                  </Link>
                  <nav className="flex flex-col gap-4">
                    {NewsCategories.map((category) => (
                      <Link
                        key={category.value}
                        href={`/category/${category.value}`}
                        className={cn(
                          "text-muted-foreground hover:text-foreground transition-colors",
                          pathname === `/category/${category.value}` && "text-foreground font-medium"
                        )}
                      >
                        {category.label}
                      </Link>
                    ))}
                    <Separator />
                    <Link
                      href="/sports"
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        pathname === "/sports" && "text-foreground font-medium"
                      )}
                    >
                      Sports
                    </Link>
                    <Link
                      href="/stocks"
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        pathname === "/stocks" && "text-foreground font-medium"
                      )}
                    >
                      Stocks
                    </Link>
                    <Link
                      href="/subscription"
                      className={cn(
                        "text-muted-foreground hover:text-foreground transition-colors",
                        pathname === "/subscription" && "text-foreground font-medium"
                      )}
                    >
                      Subscribe
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            <Link href="/" className="flex items-center gap-2 font-bold text-2xl">
              MAHAKESARI
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {NewsCategories.slice(0, 4).map((category) => (
                <Link
                  key={category.value}
                  href={`/category/${category.value}`}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                    pathname === `/category/${category.value}` && "text-foreground"
                  )}
                >
                  {category.label}
                </Link>
              ))}
              <Link
                href="/sports"
                className={cn(
                  "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  pathname === "/sports" && "text-foreground"
                )}
              >
                Sports
              </Link>
              <Link
                href="/stocks"
                className={cn(
                  "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  pathname === "/stocks" && "text-foreground"
                )}
              >
                Stocks
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {searchOpen ? (
              <div className="flex items-center gap-2 bg-muted rounded-md px-2 animate-in fade-in">
                <Input 
                  type="search"
                  placeholder="Search news..."
                  className="border-none shadow-none focus-visible:ring-0 h-9"
                />
                <Button variant="ghost" size="icon" onClick={() => setSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}
            <ModeToggle />
            <div className="hidden md:block">
              <Link href="/subscription">
                <Button variant="default" size="sm">Subscribe</Button>
              </Link>
            </div>
            <Link href="/profile">
              <Avatar className="h-8 w-8">
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}