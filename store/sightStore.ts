import { createContentStore } from './contentStore';
import { SightType } from '@/interfaces/sight.interface';

export const useSightContentStore = createContentStore<SightType>();