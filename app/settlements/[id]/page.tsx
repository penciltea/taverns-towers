import ViewSettlement from '@/components/Settlement/View/ViewSettlement';

export default async function ViewSettlementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // getting authentication session to conditionally render settlement edit/delete buttons based on authorization
  const { getSettlementById } = await import('@/lib/actions/settlement.actions');
  const settlement = await getSettlementById(id);

  if (!settlement) {
    return <p>Settlement not found!</p>;
  }

  return (
    <ViewSettlement settlement={settlement} />
  );
}
