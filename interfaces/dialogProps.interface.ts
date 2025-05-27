export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    message?: string;
    deleting?: string; // optional: for context like 'settlement', 'site'
    dialogMode?: 'direct' | 'global' // optional, for site type dialog
    defaultSettlementId?: string | null // optional, for site type dialog
  }