import FilteredGridView from '@/components/Grid/FilteredGridView';
import TownFilters from '@/components/Town/View/TownFilter';
import { getAllTowns } from '@/lib/actions/town.actions';

export default async function TownsPage() {
  const defaultImage = "/placeholders/town.png";
  const { success, towns } = await getAllTowns();

  if (!success || !towns) {
    return <div>No towns found</div>;
  }

  console.log(towns);

  // Pre-calculate the values for each field
  const fields = towns.map((town) => ({
    link: `/towns/${town._id}`,
    title: town.name,
    subtitle: `Size: ${town.size || 'N/A'}`,
    image: town.map || defaultImage,
    tags: town.tags,
  }));

  return (
    <FilteredGridView
      title="My Towns"
      filterComponent={<TownFilters />}
      initialItems={towns || []}  // Ensure towns is defined
      fields={fields} // Pass pre-calculated fields to the child
      fabLabel="Add Town"
      fabLink="/towns/"
    />
  );
}
