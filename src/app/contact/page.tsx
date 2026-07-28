import type { Metadata } from 'next';
import { ContactView } from '../../components/ContactView';

export const metadata: Metadata = {
  title: 'Fale Conosco - Prime Visita',
};

export default function Page() {
  return <ContactView />;
}
