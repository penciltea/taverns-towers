import ViewSite from '@/components/Site/View/ViewSite';
import { AppError } from '@/lib/errors/app-error';
import Typography from '@mui/material/Typography';

export default async function ViewSitePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { getSiteById } = await import('@/lib/actions/site.actions');
    const result = await getSiteById(id);

    if (result.success) {
      const site = result.data;
      return <ViewSite site={site} />;
    } else {
      return (
        <>
          <Typography variant="h5" component="p" gutterBottom>Site Not Found</Typography>
          <Typography>{ result.message }</Typography>
        </>
      );
    }
  } catch (err: unknown) {
    // Catch unexpected errors
    const message =
      err instanceof AppError
        ? err.userMessage
        : "Something went wrong loading this NPC.";

    return (
      <>
        <Typography variant="h5" component="p" gutterBottom>Site Not Found</Typography>
        <Typography>{ message }</Typography>
      </>
    );
  }
}