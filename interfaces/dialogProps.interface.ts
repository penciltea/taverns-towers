import { UseFormReturn } from "react-hook-form";
import { ReactNode } from "react";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    message?: string | ReactNode;
    deleteText?: string; // optional, to change button text if needed
    deleting?: string; // optional: for context like 'settlement', 'site'
    dialogMode?: 'direct' | 'global' // optional, for site type dialog
    defaultSettlementId?: string | null // optional, for site type dialog
    methods?: UseFormReturn<any>; // optional, for site forms, changing the sub-type
    // for forms that have a site sub-type change (changing shop types, guild types, etc.)
    siteChange?: {
      type: "shop" | "guild";
      field: "shopType" | "guildType";
      value: string;
    }
  }