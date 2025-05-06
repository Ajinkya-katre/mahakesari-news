import PricingCards from "@/components/subscription/pricing-cards";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-b from-muted/50 to-background pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Subscribe to AI News</h1>
            <p className="text-muted-foreground text-lg">
              Get unlimited access to AI-powered insights, premium content, and exclusive features
            </p>
          </div>
          <PricingCards />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Why Subscribe?</h2>
            <p className="text-muted-foreground mb-6">
              Our premium subscription offers a range of benefits that enhance your news experience 
              and provide deeper insights into the stories that matter.
            </p>
            <ul className="space-y-4">
              {[
                "Unlimited access to all premium articles and analysis",
                "AI-generated insights and exclusive content",
                "Ad-free reading experience across all devices",
                "Personalized news feed based on your interests",
                "Advanced stock market tools and financial insights",
                "Early access to special reports and features"
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-muted/30 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-4">Testimonials</h3>
            <div className="space-y-6">
              {[
                {
                  quote: "The AI-powered insights have completely transformed how I stay informed. I get personalized news that's relevant to my interests and industry.",
                  author: "Sarah K., Technology Executive"
                },
                {
                  quote: "As a financial advisor, the stock market dashboard has become an essential part of my daily routine. Comprehensive, accurate, and easy to use.",
                  author: "Michael T., Financial Advisor"
                },
                {
                  quote: "The premium subscription is well worth it just for the ad-free experience. The additional insights and exclusive content make it exceptional value.",
                  author: "Elena R., Marketing Director"
                }
              ].map((testimonial, i) => (
                <div key={i} className="border-l-4 border-primary/40 pl-4">
                  <p className="italic mb-2">{testimonial.quote}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does the subscription billing work?",
                  answer: "Subscriptions are available in monthly or annual plans. Annual plans offer a 20% discount compared to monthly billing. Your subscription will automatically renew at the end of your billing period unless you cancel."
                },
                {
                  question: "Can I cancel my subscription at any time?",
                  answer: "Yes, you can cancel your subscription at any time from your account settings. If you cancel, you'll continue to have access until the end of your current billing period."
                },
                {
                  question: "Is there a free trial available?",
                  answer: "Yes, new subscribers can try our Premium plan free for 7 days. You can cancel anytime during the trial period and won't be charged."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, PayPal, and Apple Pay for subscription payments. All transactions are secure and encrypted."
                },
                {
                  question: "How do I change my subscription plan?",
                  answer: "You can upgrade, downgrade, or cancel your subscription at any time by going to your account settings and selecting 'Manage Subscription'."
                },
                {
                  question: "Are there discounts for students or educators?",
                  answer: "Yes, we offer a 50% discount on all subscription plans for verified students and educators. Contact our support team with valid ID for verification."
                }
              ].map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
}