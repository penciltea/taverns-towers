import { createContentStore } from './contentStore';
import { Settlement } from '@/interfaces/settlement.interface';

export const useSettlementContentStore = createContentStore<Settlement>();
