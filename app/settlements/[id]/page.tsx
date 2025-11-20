import ViewSettlement from '@/components/Settlement/View/ViewSettlement';
import { AppError } from '@/lib/errors/app-error';
import { Typography } from '@mui/material';

export default async function ViewSettlementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const { getSettlementById } = await import('@/lib/actions/settlement.actions');
    const result = await getSettlementById(id);

    if(result.success){
      const settlement = result.data;
      return <ViewSettlement settlement={settlement} />
    } else {
      return (
        <>
          <Typography variant="h5" component="p" gutterBottom>Settlement Not Found</Typography>
          <Typography>{ result.message }</Typography>
        </>
      );
    }
  } catch (err: unknown) {
    const message =
      err instanceof AppError
      ? err.userMessage
      : "Something went wrong loading this settlement.";

    return (
      <>
        <Typography variant="h5" component="p" gutterBottom>Settlement Not Found</Typography>
        <Typography>{ message }</Typography>
      </>
    );
  }
}
