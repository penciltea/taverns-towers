'use client';

import { Npc } from "@/interfaces/npc.interface";
import NpcActions from './NpcActions';
import NpcDetails from './NpcDetails';
import NpcConnections from './NpcConnections';
import EntityViewLayout from '@/components/Layout/EntityView/EntityViewLayout';
import EntityViewImage from '@/components/Layout/EntityView/EntityViewImage';
import NpcDescriptions from './NpcDescriptions';

interface NpcProps {
  npc: Npc;
}


export default function ViewNpc({ npc }: NpcProps){

  return (
    <EntityViewLayout
      title={ npc.name }
      actions={ <NpcActions {...npc} /> }
      leftContent={ <NpcDetails npc={npc} /> }
      rightContent={
          <EntityViewImage
            title="Portrait"
            imageUrl={npc.image ?? undefined}
            placeholderText={`Portrait of ${npc.name}`}
            fallbackText="No NPC portait uploaded."
          />
      }
      extraContent={ <NpcDescriptions npc={npc} userId={npc.userId}/> }
      connections={ <NpcConnections connections={npc.connections} /> }
    />
  )
}