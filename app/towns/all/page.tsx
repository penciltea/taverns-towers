import FilteredGridView from '@/components/Grid/FilteredGridView';
import TownFilters from '@/components/Town/View/TownFilter';
import GridItem from '@/components/Grid/GridItem';
import { Town } from '@/interfaces/town.interface';
import { getAllTowns } from '@/lib/actions/town.actions';
import { useTownContentStore } from '@/store/townStore';
import { useEffect } from 'react';

export default async function TownsPage() {
  const defaultImage = "/placeholders/town.png";
  const { success, towns } = await getAllTowns();

  return (
    <FilteredGridView
      title="My Towns"
      initialTowns={success && towns ? towns : []}
    />
  );
}
