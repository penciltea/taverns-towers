import ViewNpc from '@/components/Npc/View/ViewNpc';
import { AppError } from '@/lib/errors/app-error';
import Typography from '@mui/material/Typography';

export default async function ViewNpcPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { getNpcById } = await import('@/lib/actions/npc.actions');
    const result = await getNpcById(id);

    if (result.success) {
        const npc = result.data;
        return <ViewNpc npc={npc} />;
    } else {
        return (
            <>
                <Typography variant="h5" component="p" gutterBottom>NPC Not Found</Typography>
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
            <Typography variant="h5" component="p" gutterBottom>NPC Not Found</Typography>
            <Typography>{ message }</Typography>
        </>
    );
  }
}
