"use client"

import { useState } from 'react'
import { CheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SubscriptionPlans } from '@/lib/constants'
import { cn } from '@/lib/utils'

export default function PricingCards() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const discount = 0.2 // 20% discount for yearly

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Choose Your Subscription Plan</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Get access to premium content, AI-powered insights, and exclusive features 
          with our subscription plans.
        </p>
        
        <div className="flex items-center justify-center mt-8 mb-8">
          <div className="bg-muted rounded-lg p-1 inline-flex">
            <Button
              variant={billingCycle === 'monthly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('monthly')}
              className="rounded-md text-sm"
            >
              Monthly
            </Button>
            <Button
              variant={billingCycle === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setBillingCycle('yearly')}
              className="rounded-md text-sm"
            >
              Yearly
              <span className="ml-1.5 bg-primary-foreground text-primary text-xs px-1.5 py-0.5 rounded-sm">
                -20%
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {SubscriptionPlans.map((plan) => {
          const price = billingCycle === 'yearly' 
            ? plan.price * 12 * (1 - discount)
            : plan.price
          
          const isPopular = plan.id === 'premium'
          
          return (
            <Card 
              key={plan.id} 
              className={cn(
                "flex flex-col", 
                isPopular && "border-primary shadow-lg relative"
              )}
            >
              {isPopular && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-bl-lg rounded-tr-lg">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="mt-1 mb-6">
                  <span className="text-3xl font-bold">
                    {plan.price === 0 ? 'Free' : `$${price.toFixed(2)}`}
                  </span>
                  {plan.price > 0 && (
                    <span className="text-muted-foreground ml-1">
                      /{billingCycle}
                    </span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={plan.id === 'free' ? 'outline' : 'default'} 
                  className="w-full"
                >
                  {plan.id === 'free' ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  )
}