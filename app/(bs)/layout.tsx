import { buildMetadata, RootDocument } from '@/components/root-document';

export { viewport } from '@/components/root-document';
export const metadata = buildMetadata('bs');

export default function BsLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument lang="bs">{children}</RootDocument>;
}
