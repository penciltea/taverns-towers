import { createContentStore } from './contentStore';
import { SiteType } from '@/interfaces/site.interface';

export const useSiteContentStore = createContentStore<SiteType>();