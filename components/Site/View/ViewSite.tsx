import EntityViewLayout from "@/components/Layout/EntityView/EntityViewLayout";
import EntityViewImage from "@/components/Layout/EntityView/EntityViewImage";
import SiteActions from './SiteActions';
import { SiteType, SiteTypeMap } from '@/interfaces/site.interface';
import SiteDetails from './SiteDetails';
import SiteConnections from './SiteConnections';
import SiteDescriptions from './SiteDescriptions';

interface ViewSiteProps {
  site: SiteType;
}

export default function ViewSite({ site }: ViewSiteProps) {
  const siteType = site.type as keyof SiteTypeMap;
  const typedSite = site as SiteTypeMap[typeof siteType];


  return (
    <EntityViewLayout
      title={ site.name }
      actions={ <SiteActions site={typedSite} /> }
      leftContent={ <SiteDetails site={typedSite} /> }
      rightContent={
          <EntityViewImage
            title="Map"
            imageUrl={site.image ?? undefined}
            placeholderText={`Map of ${site.name}`}
            fallbackText="No map image uploaded."
          />
      }
      extraContent={ <SiteDescriptions site={site} userId={site.userId} /> }
      connections={ <SiteConnections connections={site.connections} /> }
    />
  );
}
