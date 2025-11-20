import { create } from 'zustand';
import { UserInterface } from '@/interfaces/user.interface';

interface AuthState {
    user: UserInterface | null;
    hasHydrated: boolean;

    // Actions
    setUser: (user: UserInterface) => void;
    clearUser: () => void;
    setHasHydrated: () => void;
    
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    hasHydrated: false,

    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
    setHasHydrated: () => set({ hasHydrated: true }),
}));