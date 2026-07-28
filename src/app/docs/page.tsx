import type { Metadata } from 'next';
import { DocsView } from '../../components/DocsView';

export const metadata: Metadata = {
  title: 'Documentação - Prime Visita',
};

export default function Page() {
  return <DocsView />;
}
