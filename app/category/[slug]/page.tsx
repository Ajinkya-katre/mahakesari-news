import { notFound } from "next/navigation";
import { mockNewsData } from "@/lib/mocks/news-data";
import { NewsCategories } from "@/lib/constants";
import FeaturedNews from "@/components/news/featured-news";
import NewsGrid from "@/components/news/news-grid";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = params.slug.toLowerCase();
  
  // Check if the category is valid
  const isValidCategory = NewsCategories.some(
    (c) => c.value === category
  );
  
  if (!isValidCategory && category !== "ai-insights") {
    return notFound();
  }
  
  // Get articles for this category or AI insights
  let categoryArticles = [];
  let categoryName = "";
  
  if (category === "ai-insights") {
    categoryArticles = mockNewsData.filter((article) => article.isAIGenerated);
    categoryName = "AI Insights";
  } else {
    categoryArticles = mockNewsData.filter(
      (article) => article.category === category
    );
    categoryName = NewsCategories.find(
      (c) => c.value === category
    )?.label || "";
  }
  
  // If no articles found, return 404
  if (categoryArticles.length === 0) {
    return notFound();
  }
  
  // Get featured article (most recent) and the rest
  const featuredArticle = categoryArticles[0];
  const restOfArticles = categoryArticles.slice(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground">
          The latest news and updates in {categoryName.toLowerCase()}
        </p>
      </div>
      
      <div className="mt-8">
        <FeaturedNews article={featuredArticle} />
      </div>
      
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Latest in {categoryName}</h2>
        <NewsGrid articles={restOfArticles} columns={3} />
      </div>
    </div>
  );
}