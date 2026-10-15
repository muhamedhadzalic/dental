import { buildMetadata, RootDocument } from '@/components/root-document';

export { viewport } from '@/components/root-document';
export const metadata = buildMetadata('en');

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="en">{children}</RootDocument>;
}
