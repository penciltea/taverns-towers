'use client'

import { useUIStore } from "@/store/uiStore";
import SiteTypeDialog from "../Site/Dialog/SiteTypeDialog";
import SiteDetailsDialog from "../Site/Dialog/SiteDetailsDialog";
import SettlementDetailsDialog from "../Settlement/View/SettlementDetailsDialog";

export default function DialogContainer() {
  const { openDialog, dialogProps, closeDialog } = useUIStore();

  switch (openDialog) {
    case 'SiteDetailsDialog':
        if (!dialogProps?.siteData) return null;
          return (
            <SiteDetailsDialog
              open
              onClose={closeDialog}
              siteData={dialogProps.siteData}
              settlementId={dialogProps.siteData.settlementId}
              onDelete={() =>
                dialogProps.siteData &&
                dialogProps.onDelete?.() // fallback if you passed it via props
              }
            />
        );
    case 'siteTypeDialog' :
        return (
            <SiteTypeDialog
                open={openDialog === 'siteTypeDialog'}
                onClose={closeDialog}
                dialogMode={dialogProps.dialogMode}
                defaultSettlementId={dialogProps.settlementId}
            />
        )
    case 'SiteDetailsDialog' :
        return (
          <SiteDetailsDialog
              open
              onClose={closeDialog}
              siteData={dialogProps.selected}
              settlementId={dialogProps.settlementId}
              onDelete={dialogProps.onDelete}
          />
        )
    case 'SettlementDetailsDialog' :
      return (
        <SettlementDetailsDialog 
          open 
          onClose={closeDialog} 
          settlement={dialogProps.settlement} 
        />
      )
    // Add more dialogs here as needed
    // case 'AnotherDialog':
    //   return <AnotherDialog open {...dialogProps} />

    default:
      return null;
  }
}