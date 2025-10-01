'use client'

import { useUIStore } from "@/store/uiStore";
import SiteTypeDialog from "@/components/Site/Dialog/SiteTypeDialog";
import SiteDetailsDialog from "@/components/Site/Dialog/SiteDetailsDialog";
import SettlementDetailsDialog from "@/components/Settlement/View/SettlementDetailsDialog";
import TypeChangeDialog from "@/components/Common/Dialog/typeChangeDialog";
import LoginDialog from "@/components/Auth/LoginDialog";
import DeleteConnectionDialog from "@/components/Common/EntityLink/DeleteConnectionDialog";
import RegisterDialog from "@/components/Auth/RegisterDialog";

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
        <TypeChangeDialog />
      )
    case 'LoginDialog':
      return (
        <LoginDialog
          open
          onClose={closeDialog}
          onLoginSuccess={dialogProps?.onLoginSuccess}
        />
      )
    case 'RegisterDialog':
      return (
        <RegisterDialog
          open
          onClose={closeDialog}
          onRegisterSuccess={() => {
            // close register and open login
            closeDialog();
            setTimeout(() => {
              useUIStore.getState().setOpenDialog("LoginDialog");
            }, 0);
          }}
        />
      );

    case 'DeleteConnectionDialog':
      return (
        <DeleteConnectionDialog
          open
          onClose={closeDialog}
          onConfirm={dialogProps?.onConfirm}
          deletedConnections={dialogProps?.deletedConnections}

        />
      )
    // Add more dialogs here as needed
    // case 'AnotherDialog':
    //   return <AnotherDialog open {...dialogProps} />

    default:
      return null;
  }
}