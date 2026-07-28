export interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  badge?: string;
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
