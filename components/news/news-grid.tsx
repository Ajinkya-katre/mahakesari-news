import NewsCard from './news-card'
import { cn } from '@/lib/utils'

interface NewsGridProps {
  articles: Array<{
    id: string
    title: string
    excerpt: string
    category: string
    imageUrl: string
    publishedAt: Date
    isAIGenerated?: boolean
    author?: string
  }>
  columns?: 2 | 3 | 4
  className?: string
}

export default function NewsGrid({ articles, columns = 3, className }: NewsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  )
}