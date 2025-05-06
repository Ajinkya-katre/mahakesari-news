import CricketScores from "@/components/sports/cricket-scores"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNewsData } from "@/lib/mocks/news-data"

export default function SportsPage() {
  const sportsNews = mockNewsData.filter(article => article.category === 'sports')

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Sports News</h1>
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Sports</TabsTrigger>
              <TabsTrigger value="cricket">Cricket</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
              <TabsTrigger value="tennis">Tennis</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-6">
              {sportsNews.map((article) => (
                <Card key={article.id}>
                  <CardHeader>
                    <CardTitle>{article.title}</CardTitle>
                    <CardDescription>
                      {article.author} · {new Date(article.publishedAt).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>{article.excerpt}</p>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="cricket">
              <Card>
                <CardHeader>
                  <CardTitle>Cricket News</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Loading cricket news...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="football">
              <Card>
                <CardHeader>
                  <CardTitle>Football News</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Loading football news...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tennis">
              <Card>
                <CardHeader>
                  <CardTitle>Tennis News</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Loading tennis news...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <CricketScores />
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {[
                  "ICC T20 World Cup 2025",
                  "FIFA World Cup 2026",
                  "Wimbledon 2025",
                  "Olympics 2024"
                ].map((event, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span>{event}</span>
                    <span className="text-sm text-muted-foreground">Coming soon</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}