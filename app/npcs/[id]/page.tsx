import { auth } from '@/lib/auth/authHelpers';
import { getNpcById } from '@/lib/actions/npc.actions';
import ViewNpc from '@/components/Npc/View/ViewNpc';

export default async function ViewNpcPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // getting authentication session to conditionally render npc edit/delete buttons based on authorization
  const session = await auth();
  const npc = await getNpcById(id);

  if (!npc) {
    return <p>Npc not found!</p>;
  }

  return (
    <ViewNpc
      npc={npc}
      session={session}
    />
  );
}
