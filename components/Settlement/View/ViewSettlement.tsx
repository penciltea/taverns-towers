'use client';

import { useUIStore } from '@/store/uiStore';
import { Settlement } from '@/interfaces/settlement.interface';
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SettlementActions from "@/components/Settlement/View/SettlementActions";
import SiteList from "@/components/Settlement/View/SiteList";
import FabButton from "@/components/Common/fabButton";
import SettlementConnections from "./SettlementConnections";
import { useSession } from "next-auth/react";
import { canEdit } from "@/lib/auth/authPermissions";
import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";

interface ViewSettlementProps {
  settlement: Settlement;
}

export default function ViewSettlement({ settlement }: ViewSettlementProps) {
  const { setOpenDialog } = useUIStore();
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  
  const editable = canEdit(user, { userId: settlement.userId, editors: settlement.editors });


  return (
    <EntityViewLayout
      title={ settlement.name }
      actions={ <SettlementActions {...settlement} /> }
      leftContent={ <SettlementDetails settlement={settlement} /> }
      rightContent={
          <EntityViewImage
            title="Map"
            imageUrl={settlement.map ?? undefined}
            placeholderText={`Map of ${settlement.name}`}
            fallbackText="No map image uploaded."
          />
      }
      extraContent={ <SiteList settlementId={settlement._id} /> }
      connections={ <SettlementConnections connections={settlement.connections} /> }
      fab={editable && <FabButton label="Add Site" onClick={() => setOpenDialog('siteTypeDialog', { 
          dialogMode: 'direct', 
          settlementId: settlement._id, 
        })}  />}
    />
  );
}
