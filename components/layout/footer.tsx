import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { NewsCategories } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-muted/40 pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1">
            <Link href="/" className="font-bold text-xl mb-4 inline-block">
              MAHAKESARI
            </Link>
            <p className="text-muted-foreground text-sm mt-2">
              Stay informed with AI-powered news across various sectors, 
              personalized to your interests and location.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="grid grid-cols-2 gap-2">
              {NewsCategories.slice(0, 6).map((category) => (
                <Link
                  key={category.value}
                  href={`/category/${category.value}`}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Features</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/stocks"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Stock Market
              </Link>
              <Link
                href="/local-news"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Local News
              </Link>
              <Link
                href="/subscription"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Premium Subscription
              </Link>
            </div>
          </div>
          <div className="col-span-1">
            <h3 className="font-semibold mb-4">Company</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MAHAKESARI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Facebook
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}