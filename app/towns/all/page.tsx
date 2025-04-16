import { getAllTowns } from '@/lib/actions/town.actions';
import GridContainer from '@/components/grid/GridContainer';
import { Typography } from '@mui/material';
import GridItem from '@/components/grid/GridItem';
import { Town } from '@/interfaces/town.interface';
import FabButton from '@/components/ui/fabButton';

export default async function ViewAllTownsPage(){
    const defaultImage = "/placeholders/town.png";
    const response = await getAllTowns();

    if (!response.success || !response.towns) {
        return <Typography variant="body1">No towns found.</Typography>;
    }
    
    return (
        <>
            <Typography variant="h4">My Towns</Typography>
            <GridContainer>
                {response.towns.map((town: Town) => (
                    <GridItem key={town._id} link={`/towns/${town._id}`} title={town.name} subtitle={`Size: ${town.size}`} image={town.map ? town.map : defaultImage} tags={town.tags} />
                ))}
            </GridContainer>
            <FabButton label="Add Town" link={`/towns/`} />
        </>
    )
}