import { createContentStore } from './contentStore';
import { Town } from '@/interfaces/town.interface';

export const useTownContentStore = createContentStore<Town>();
