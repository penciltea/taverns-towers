import { getNpcById } from '@/lib/actions/npc.actions';
import ViewNpc from '@/components/Npc/View/ViewNpc';

export default async function ViewNpcPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const npc = await getNpcById(id);

  if (!npc) {
    return <p>Npc not found!</p>;
  }

  return (
    <ViewNpc
      npc={npc}
    />
  );
}
