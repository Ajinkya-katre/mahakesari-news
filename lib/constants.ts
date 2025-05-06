export const NewsCategories = [
  { value: "technology", label: "Technology" },
  { value: "politics", label: "Politics" },
  { value: "business", label: "Business" },
  { value: "health", label: "Health" },
  { value: "science", label: "Science" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
  { value: "world", label: "World" },
] as const;

export const SubscriptionPlans = [
  {
    id: "free",
    name: "Free",
    description: "Access to limited content with ads",
    price: 0,
    features: [
      "Access to basic news articles",
      "Limited category browsing",
      "Ad-supported experience",
      "Basic stock information",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "Full access to all content, ad-free experience",
    price: 9.99,
    features: [
      "Unlimited access to all articles",
      "Ad-free experience",
      "Exclusive AI-generated insights",
      "Detailed stock analysis and reports",
      "Local news personalization",
      "Save articles for offline reading",
    ],
  },
  {
    id: "business",
    name: "Business",
    description: "Premium features plus team access and advanced analytics",
    price: 29.99,
    features: [
      "All Premium features",
      "Team access (up to 5 users)",
      "Advanced stock market analytics",
      "Custom news alerts",
      "Downloadable reports",
      "API access for custom integrations",
    ],
  },
];

export const StockMarketIndices = [
  { symbol: "^DJI", name: "Dow Jones Industrial Average" },
  { symbol: "^GSPC", name: "S&P 500" },
  { symbol: "^IXIC", name: "NASDAQ Composite" },
  { symbol: "^FTSE", name: "FTSE 100" },
  { symbol: "^N225", name: "Nikkei 225" },
];