import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

interface NewsCardProps {
  article: {
    id: string
    title: string
    excerpt: string
    category: string
    imageUrl: string
    publishedAt: Date
    isAIGenerated?: boolean
    author?: string
  }
  variant?: 'default' | 'compact'
}

export default function NewsCard({ article, variant = 'default' }: NewsCardProps) {
  if (variant === 'compact') {
    return (
      <Card className="overflow-hidden h-full transition-all hover:bg-accent/20">
        <Link href={`/article/${article.id}`} className="flex h-full">
          <div className="w-1/3 relative">
            <AspectRatio ratio={1} className="h-full">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 30vw, 20vw"
              />
            </AspectRatio>
          </div>
          <div className="w-2/3 p-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="outline" className="capitalize text-xs">
                  {article.category}
                </Badge>
                {article.isAIGenerated && (
                  <Badge variant="secondary" className="text-xs">
                    AI
                  </Badge>
                )}
              </div>
              <h3 className="font-medium line-clamp-2 text-sm">{article.title}</h3>
            </div>
            <time className="text-xs text-muted-foreground">
              {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
            </time>
          </div>
        </Link>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden h-full transition-all hover:bg-accent/20">
      <Link href={`/article/${article.id}`}>
        <div className="relative">
          <AspectRatio ratio={16 / 9}>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </AspectRatio>
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge variant="secondary" className="capitalize">
              {article.category}
            </Badge>
            {article.isAIGenerated && (
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm">
                AI Insights
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <CardContent className="pt-4">
        <Link href={`/article/${article.id}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary/90 transition-colors">
            {article.title}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground flex justify-between">
        {article.author && <span>{article.author}</span>}
        <time dateTime={article.publishedAt.toISOString()}>
          {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
        </time>
      </CardFooter>
    </Card>
  )
}