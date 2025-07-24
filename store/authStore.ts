import { create } from 'zustand';
import { UserInterface } from '@/interfaces/user.interface';

interface AuthState {
    user: UserInterface | null;

    // Actions
    setUser: (user: UserInterface) => void;
    clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
}));