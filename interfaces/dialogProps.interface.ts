import { UseFormReturn } from "react-hook-form";

export interface DialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    message?: string;
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