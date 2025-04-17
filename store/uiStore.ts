import { create } from 'zustand';

interface TownFilters {
  search: string;
  size: string;
  tags: string[];
  climate: string;
  terrain: string[];
  magic: string;
}

interface UIState {
    //side drawer
    isDrawerOpen: boolean;
    toggleDrawer: () => void;

    // Dialog state
    openDialog: null | 'addTownDialog' | 'TownDetailsDialog' | 'deleteConfirmationDialog' | 'locationTypeDialog';
    setOpenDialog: (dialog: UIState['openDialog']) => void;
    closeDialog: () => void;

    //snackbar
    snackbarMessage: string;
    isSnackbarOpen: boolean;
    snackbarSeverity: 'success' | 'error' | 'info' | 'warning';
    showSnackbar: (message: string, severity?: UIState['snackbarSeverity']) => void;
    closeSnackbar: () => void;

    //town filtering
    townFilters: TownFilters;
    setTownFilters: (filters: Partial<TownFilters>) => void;
    clearTownFilters: () => void;
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

  townFilters: {
    search: '',
    size: '',
    tags: [],
    climate: '',
    terrain: [],
    magic: '',
  },
  setTownFilters: (filters) =>
    set((state) => ({
      townFilters: { ...state.townFilters, ...filters },
    })),
  clearTownFilters: () =>
    set(() => ({
      townFilters: {
        search: '',
        size: '',
        tags: [],
        climate: '',
        terrain: [],
        magic: '',
      },
    })),
}));
