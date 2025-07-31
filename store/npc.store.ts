import { createContentStore } from './contentStore';
import { Npc } from '@/interfaces/npc.interface';

export const useNpcContentStore = createContentStore<Npc>();
