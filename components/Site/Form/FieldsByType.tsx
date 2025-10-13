import dynamic from "next/dynamic";
import { SiteFormFieldProps } from "@/interfaces/site.interface";
import { Typography } from "@mui/material";

const LoadingFields = () => <Typography>Loading site fields...</Typography>;

export const siteFormFieldsByType: Record<
  string,
  React.ComponentType<SiteFormFieldProps>
> = {
  tavern: dynamic(() => import("./Tavern"), { ssr: false, loading: LoadingFields }),
  temple: dynamic(() => import("./Temple"), { ssr: false, loading: LoadingFields }),
  shop: dynamic(() => import("./Shop"), { ssr: false, loading: LoadingFields }),
  guild: dynamic(() => import("./Guild"), { ssr: false, loading: LoadingFields }),
  government: dynamic(() => import("./Government"), { ssr: false, loading: LoadingFields }),
  entertainment: dynamic(() => import("./Entertainment"), { ssr: false, loading: LoadingFields }),
  hidden: dynamic(() => import("./Hidden"), { ssr: false, loading: LoadingFields }),
  residence: dynamic(() => import("./Residence"), { ssr: false, loading: LoadingFields }),
  miscellaneous: dynamic(() => import("./Miscellaneous"), { ssr: false, loading: LoadingFields }),
};