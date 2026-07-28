import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CheckoutView } from '../../components/CheckoutView';

export const metadata: Metadata = {
  title: 'Checkout - Prime Visita',
};

export default function Page() {
  return (
    <Suspense fallback={null}>
      <CheckoutView />
    </Suspense>
  );
}
