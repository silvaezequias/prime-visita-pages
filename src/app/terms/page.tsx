import type { Metadata } from 'next';
import { TermsView } from '../../components/TermsView';

export const metadata: Metadata = {
  title: 'Termos de Uso - Prime Visita',
};

export default function Page() {
  return <TermsView />;
}
