import { create } from 'zustand';


interface UIState {
    // Side drawer
    isDrawerOpen: boolean;
    toggleDrawer: () => void;
    closeDrawer: () => void;
    openDrawer: () => void;

    // Dialog state
    openDialog: null | 'SettlementDetailsDialog' | 'deleteConfirmationDialog' | 'siteTypeDialog' | 'filterDialog' | 'SiteDetailsDialog' | 'deleteSiteDialog' | 'typeChangeDialog' | 'LoginDialog' | 'NpcDetailsDialog' | 'DeleteConnectionDialog' ;
    dialogProps: Record<string, any>;
    setOpenDialog: (dialog: UIState['openDialog'], props?: Record<string, any>) => void;
    closeDialog: () => void;

    // Snackbar
    snackbarMessage: string;
    isSnackbarOpen: boolean;
    snackbarSeverity: 'success' | 'error' | 'info' | 'warning';
    showSnackbar: (message: string, severity?: UIState['snackbarSeverity']) => void;

    // For error dialogs
    isErrorDialogOpen: boolean;
    errorMessage: string;
    showErrorDialog: (message: string) => void;
    closeErrorDialog: () => void;


    closeSnackbar: () => void;

    // Data Loading & Sending
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    isSubmitting: boolean;
    setSubmitting: (isSubmitting: boolean) => void;

    // Settlement
    tId: string | null;
    setSettlementId: (id: string) => void;   
    clearSettlementId: () => void; 

    // For UI Themes
    theme: 'light' | 'dark' | 'purple';
    setTheme: (theme: UIState['theme']) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  closeDrawer: () => set({ isDrawerOpen: false }),
  openDrawer: () => set({ isDrawerOpen: true }),

  openDialog: null,
  dialogProps: {},
  setOpenDialog: (dialog, props = {}) => set({ openDialog: dialog, dialogProps: props }),
  closeDialog: () => set({ openDialog: null }),

  snackbarMessage: '',
  isSnackbarOpen: false,
  snackbarSeverity: 'info',
  showSnackbar: (snackbarMessage, snackbarSeverity = 'info') => set({ snackbarMessage, snackbarSeverity, isSnackbarOpen: true }),
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
  clearSettlementId: () => set({ tId: null}),

  theme: 'light',
  setTheme: (theme) => set({ theme }),
}));
