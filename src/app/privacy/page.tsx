import type { Metadata } from 'next';
import { PrivacyView } from '../../components/PrivacyView';

export const metadata: Metadata = {
  title: 'Política de Privacidade - Prime Visita',
};

export default function Page() {
  return <PrivacyView />;
}
