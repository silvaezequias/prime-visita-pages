export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaText: string;
}

export interface DocSection {
  id: string;
  title: string;
  category: string;
  content: string;
  codeSnippet?: string;
  lang?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
