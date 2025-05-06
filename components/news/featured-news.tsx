import Link from 'next/link'
import Image from 'next/image'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Badge } from '@/components/ui/badge'

interface FeaturedNewsProps {
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
}

export default function FeaturedNews({ article }: FeaturedNewsProps) {
  return (
    <Card className="overflow-hidden border-none shadow-none bg-transparent">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href={`/article/${article.id}`} className="relative group">
            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg">
              <Image
                src={article.imageUrl}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </AspectRatio>
          </Link>
          <div className="flex flex-col justify-center space-y-3">
            <div className="flex items-center gap-3">
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
            <Link href={`/article/${article.id}`} className="group">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-primary/90 transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-muted-foreground line-clamp-3">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {article.author && <span>{article.author} · </span>}
              <time dateTime={article.publishedAt.toISOString()}>
                {formatDistanceToNow(article.publishedAt, { addSuffix: true })}
              </time>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}