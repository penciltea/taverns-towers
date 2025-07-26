import { create } from 'zustand';
import { UserInterface } from '@/interfaces/user.interface';

interface AuthState {
    user: UserInterface | null;

    // Actions
    setUser: (user: UserInterface) => void;
    clearUser: () => void;
    isOwner: (ownerId: string) => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),

    isOwner: (ownerId: string) => {
        const user = get().user;
        return user?.id === ownerId;
    }
}));