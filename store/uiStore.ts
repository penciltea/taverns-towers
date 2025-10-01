import { create } from 'zustand';
import { UI_THEMES, UITheme } from '@/constants/ui.options';

interface UIState {
  // Side drawer
  isDrawerOpen: boolean;
  toggleDrawer: () => void;
  closeDrawer: () => void;
  openDrawer: () => void;

  // Header
  userMenuAnchor: HTMLElement | null;
  setUserMenuAnchor: (el: HTMLElement | null) => void;
  closeUserMenu: () => void;

  // Dialog state
  openDialog: null | 'SettlementDetailsDialog' | 'deleteConfirmationDialog' | 'siteTypeDialog' | 'filterDialog' | 'SiteDetailsDialog' | 'deleteSiteDialog' | 'typeChangeDialog' | 'LoginDialog' | 'RegisterDialog' | 'DeleteConnectionDialog';
  dialogProps: Record<string, any>;
  setOpenDialog: (dialog: UIState['openDialog'], props?: Record<string, any>) => void;
  closeDialog: () => void;

  // Snackbar
  snackbarMessage: string;
  isSnackbarOpen: boolean;
  snackbarSeverity: 'success' | 'error' | 'info' | 'warning';
  showSnackbar: (message: string, severity?: UIState['snackbarSeverity']) => void;
  closeSnackbar: () => void;

  // Error dialog
  isErrorDialogOpen: boolean;
  errorMessage: string;
  showErrorDialog: (message: string) => void;
  closeErrorDialog: () => void;

  // Loading & submitting
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  isSubmitting: boolean;
  setSubmitting: (isSubmitting: boolean) => void;

  // Settlement
  tId: string | null;
  setSettlementId: (id: string) => void;
  clearSettlementId: () => void;

  // Theme
  theme: UITheme;
  setTheme: (theme: UITheme) => void;
}

export const useUIStore = create<UIState>((set) => {
  return {
    isDrawerOpen: false,
    toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
    closeDrawer: () => set({ isDrawerOpen: false }),
    openDrawer: () => set({ isDrawerOpen: true }),

    userMenuAnchor: null,
    setUserMenuAnchor: (el) => set({ userMenuAnchor: el }),
    closeUserMenu: () => set({ userMenuAnchor: null }),

    openDialog: null,
    dialogProps: {},
    setOpenDialog: (dialog, props = {}) => set({ openDialog: dialog, dialogProps: props }),
    closeDialog: () => set({ openDialog: null }),

    snackbarMessage: '',
    isSnackbarOpen: false,
    snackbarSeverity: 'info',
    showSnackbar: (snackbarMessage, snackbarSeverity = 'info') =>
      set({ snackbarMessage, snackbarSeverity, isSnackbarOpen: true }),
    closeSnackbar: () => set({ isSnackbarOpen: false }),

    isErrorDialogOpen: false,
    errorMessage: '',
    showErrorDialog: (message: string) => set({ errorMessage: message, isErrorDialogOpen: true }),
    closeErrorDialog: () => set({ isErrorDialogOpen: false, errorMessage: '' }),

    isLoading: false,
    setLoading: (isLoading) => set({ isLoading }),
    isSubmitting: false,
    setSubmitting: (isSubmitting) => set({ isSubmitting }),

    tId: null,
    setSettlementId: (id) => set({ tId: id }),
    clearSettlementId: () => set({ tId: null }),

    theme: 'dark',
    setTheme: (theme: UITheme) => {
      set({ theme });
      if (typeof window !== 'undefined') localStorage.setItem('theme', theme);
    },
  };
});
