import { createContentStore } from './contentStore';
import { UserInterface } from '@/interfaces/user.interface';

export const useUserContentStore = createContentStore<UserInterface>();
