import { create } from 'zustand';


interface UIState {
    // Side drawer
    isDrawerOpen: boolean;
    toggleDrawer: () => void;

    // Dialog state
    openDialog: null | 'SettlementDetailsDialog' | 'deleteConfirmationDialog' | 'sightTypeDialog' | 'settlementTypeDialog' | 'filterDialog' | 'SightDetailsDialog' | 'deleteSightDialog';
    setOpenDialog: (dialog: UIState['openDialog']) => void;
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
}

export const useUIStore = create<UIState>((set) => ({
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

  openDialog: null,
  setOpenDialog: (dialog) => set({ openDialog: dialog }),
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
  clearSettlementId: () => set({ tId: null})
}));
