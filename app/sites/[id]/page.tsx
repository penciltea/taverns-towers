import ViewSite from '@/components/Site/View/ViewSite';

export default async function ViewSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { getSiteById } = await import('@/lib/actions/site.actions');
  const result = await getSiteById(id);

  if (!result.success || !result.site) {
    return <p>Site not found!</p>;
  }

  return <ViewSite site={result.site} />;
}