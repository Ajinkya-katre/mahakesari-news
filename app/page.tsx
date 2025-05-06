import FeaturedNews from "@/components/news/featured-news";
import NewsGrid from "@/components/news/news-grid";
import CategoryTabs from "@/components/news/category-tabs";
import { mockNewsData } from "@/lib/mocks/news-data";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import NewsCard from "@/components/news/news-card";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  // Get the featured article (most recent)
  const featuredArticle = mockNewsData[0];
  
  // Get the latest articles excluding the featured one
  const latestArticles = mockNewsData.slice(1, 7);
  
  // Get articles per category
  const technologyArticles = mockNewsData.filter(article => article.category === 'technology').slice(0, 3);
  const businessArticles = mockNewsData.filter(article => article.category === 'business').slice(0, 3);
  const healthArticles = mockNewsData.filter(article => article.category === 'health').slice(0, 3);
  
  // Get trending articles (AI-generated ones)
  const trendingArticles = mockNewsData.filter(article => article.isAIGenerated).slice(0, 4);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Featured Article */}
        <section className="mb-12">
          <h1 className="text-3xl font-bold mb-6">Today's Headlines</h1>
          <FeaturedNews article={featuredArticle} />
        </section>
        
        {/* Category Tabs */}
        <section className="mb-12">
          {/* <CategoryTabs /> */}
          <div className="mt-6">
            <NewsGrid articles={latestArticles} />
          </div>
        </section>
        
        {/* AI Insights Section */}
        <section className="mb-12 px-4 py-8 bg-primary/5 dark:bg-primary/10 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">AI-Powered Insights</h2>
            <Link href="/category/ai-insights">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                View All <ArrowRightIcon className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingArticles.map((article) => (
              <NewsCard 
                key={article.id} 
                article={article} 
              />
            ))}
          </div>
        </section>
        
        {/* Category Sections */}
        <Tabs defaultValue="technology" className="mb-12">
          <TabsContent value="technology" className="mt-0">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Technology</h2>
              <Link href="/category/technology">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  More <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <NewsGrid articles={technologyArticles} columns={3} />
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Business</h2>
              <Link href="/category/business">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  More <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {businessArticles.map((article) => (
                <NewsCard 
                  key={article.id} 
                  article={article}
                  variant="compact" 
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Health</h2>
              <Link href="/category/health">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  More <ArrowRightIcon className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {healthArticles.map((article) => (
                <NewsCard 
                  key={article.id} 
                  article={article}
                  variant="compact" 
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Newsletter Signup */}
        <section className="mb-12 px-6 py-10 bg-muted/50 rounded-xl text-center">
          <h2 className="text-xl md:text-2xl font-bold mb-3">Stay Informed</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            Subscribe to our newsletter for daily updates, curated specifically for your interests
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <Button>Subscribe</Button>
          </div>
        </section>
      </div>
    </div>
  );
}