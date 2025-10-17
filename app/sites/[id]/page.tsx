import { getSiteById } from '@/lib/actions/site.actions';
import ViewSite from '@/components/Site/View/ViewSite';

export default async function ViewSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const site = await getSiteById(id);

  if (!site) {
    return <p>Npc not found!</p>;
  }

  return (
    <ViewSite site={site} />
  );
}
