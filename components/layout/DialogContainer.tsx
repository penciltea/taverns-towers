'use client'

import { useUIStore } from "@/store/uiStore";
import SiteTypeDialog from "../Site/Dialog/SiteTypeDialog";
import SiteDetailsDialog from "../Site/Dialog/SiteDetailsDialog";
import SettlementDetailsDialog from "../Settlement/View/SettlementDetailsDialog";
import TypeChangeDialog from "../Common/typeChangeDialog";
import LoginDialog from "../Auth/LoginDialog";

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
                dialogProps.onDelete?.() // fallback if passed via props
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
    case 'typeChangeDialog' :
      return (
        <TypeChangeDialog
          open
          onClose={closeDialog}
          siteChange={dialogProps.siteChange}
          methods={dialogProps.methods}
        />
      )
    case 'LoginDialog':
      return (
        <LoginDialog
          open
          onClose={closeDialog}
          onLoginSuccess={dialogProps?.onLoginSuccess}
        />
      )
    // Add more dialogs here as needed
    // case 'AnotherDialog':
    //   return <AnotherDialog open {...dialogProps} />

    default:
      return null;
  }
}