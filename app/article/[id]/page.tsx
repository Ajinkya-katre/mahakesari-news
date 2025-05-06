import { notFound } from "next/navigation";
import { mockNewsData } from "@/lib/mocks/news-data";
import { formatDistanceToNow, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NewsCard from "@/components/news/news-card";

export default function ArticlePage({ params }: { params: { id: string } }) {
  const article = mockNewsData.find((article) => article.id === params.id);

  if (!article) {
    return notFound();
  }

  // Get related articles (same category, excluding current article)
  const relatedArticles = mockNewsData
    .filter(
      (a) => a.category === article.category && a.id !== article.id
    )
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Link href={`/category/${article.category}`}>
              <Badge variant="secondary" className="capitalize">
                {article.category}
              </Badge>
            </Link>
            {article.isAIGenerated && (
              <Badge variant="outline" className="text-xs">
                AI Insights
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            {article.author && <span>{article.author} · </span>}
            <time dateTime={article.publishedAt.toISOString()}>
              {format(article.publishedAt, 'MMMM d, yyyy')}
            </time>
            <span>&middot;</span>
            <span>{formatDistanceToNow(article.publishedAt, { addSuffix: true })}</span>
          </div>
          
          <div className="mb-8">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </AspectRatio>
          </div>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-lg leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <div className="flex flex-wrap gap-2">
              {['News', article.category, article.isAIGenerated ? 'AI' : ''].filter(Boolean).map((tag, index) => (
                <Badge key={index} variant="outline" className="capitalize">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="sticky top-24">
            <h2 className="text-xl font-bold mb-4">Related Articles</h2>
            <div className="space-y-4">
              {relatedArticles.map((relatedArticle) => (
                <NewsCard
                  key={relatedArticle.id}
                  article={relatedArticle}
                  variant="compact"
                />
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
            <div className="flex flex-wrap gap-2">
              {['Technology', 'Business', 'Politics', 'Health', 'Science', 'Entertainment'].map((category) => (
                <Link key={category} href={`/category/${category.toLowerCase()}`}>
                  <Badge variant="secondary" className="capitalize">
                    {category}
                  </Badge>
                </Link>
              ))}
            </div>
            
            <Separator className="my-8" />
            
            <div className="bg-muted/50 p-6 rounded-lg">
              <h3 className="text-lg font-medium mb-3">Subscribe for Updates</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest news and articles delivered directly to your inbox
              </p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                />
                <button className="w-full bg-primary text-primary-foreground h-10 rounded-md text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}