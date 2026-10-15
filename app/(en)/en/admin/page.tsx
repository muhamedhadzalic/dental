import type { Metadata } from 'next';
import { AdminCalendar } from '@/components/admin/admin-calendar';
import { getDictionary } from '@/lib/i18n/dictionaries';

export const metadata: Metadata = { title: getDictionary('en').admin.title };

export default function AdminPage() {
  return <AdminCalendar />;
}
