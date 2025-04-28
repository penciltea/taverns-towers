import { create } from 'zustand';


interface UIState {
    // Side drawer
    isDrawerOpen: boolean;
    toggleDrawer: () => void;

    // Dialog state
    openDialog: null | 'addTownDialog' | 'TownDetailsDialog' | 'deleteConfirmationDialog' | 'locationTypeDialog' | 'filterDialog' | 'LocationDetailsDialog' | 'deleteLocationDialog';
    setOpenDialog: (dialog: UIState['openDialog']) => void;
    closeDialog: () => void;

    // Snackbar
    snackbarMessage: string;
    isSnackbarOpen: boolean;
    snackbarSeverity: 'success' | 'error' | 'info' | 'warning';
    showSnackbar: (message: string, severity?: UIState['snackbarSeverity']) => void;
    closeSnackbar: () => void;

    // Data Loading & Sending
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;

    isSubmitting: boolean;
    setSubmitting: (isSubmitting: boolean) => void;

    // Town
    tId: string | null;
    setTownId: (id: string) => void;   
    clearTownId: () => void; 
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

  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),

  isSubmitting: false,
  setSubmitting: (isSubmitting) => set({ isSubmitting }),

  tId: null,
  setTownId: (id) => set({ tId: id }),
  clearTownId: () => set({ tId: null})
}));
