export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    message?: string;
    deleting?: string; // optional: for context like 'settlement', 'location'
  }