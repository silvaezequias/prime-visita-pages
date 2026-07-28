import type { Metadata } from 'next';
import { PricingView } from '../../components/PricingView';

export const metadata: Metadata = {
  title: 'Planos - Prime Visita',
};

export default function Page() {
  return <PricingView />;
}
