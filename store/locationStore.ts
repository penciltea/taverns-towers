import { createContentStore } from './contentStore';
import { LocationType } from '@/interfaces/location.interface';

export const useLocationContentStore = createContentStore<LocationType>();