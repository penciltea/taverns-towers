'use client';

import { useUIStore } from '@/store/uiStore';
import { Settlement } from '@/interfaces/settlement.interface';
import SettlementDetails from "@/components/Settlement/View/SettlementDetails";
import SettlementActions from "@/components/Settlement/View/SettlementActions";
import SiteList from "@/components/Settlement/View/SiteList";
import FabButton from "@/components/Common/Button/fabButton";
import SettlementConnections from "./SettlementConnections";
import { useSession } from "next-auth/react";
import { canEdit } from "@/lib/auth/authPermissions";
import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";
import { useCampaignPermissionsQuery } from '@/hooks/campaign/campaign.query';
import { useCampaignStore } from '@/store/campaignStore';

interface ViewSettlementProps {
  settlement: Settlement;
}

export default function ViewSettlement({ settlement }: ViewSettlementProps) {
  const { setOpenDialog } = useUIStore();
  const { data: session } = useSession();
  const user = session?.user ? { id: session.user.id } : null;
  const { selectedCampaign } = useCampaignStore();
  const { data: campaignPermissions } = useCampaignPermissionsQuery(selectedCampaign?._id);
  
  const creatable = canEdit(user?.id, { userId: settlement.userId }, campaignPermissions ?? undefined);


  return (
    <EntityViewLayout
      title={ settlement.name }
      actions={ <SettlementActions settlement={settlement} /> }
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
      fab={creatable && <FabButton label="Add Site" onClick={() => setOpenDialog('siteTypeDialog', { 
          dialogMode: 'direct', 
          settlementId: settlement._id, 
        })}  />}
    />
  );
}
