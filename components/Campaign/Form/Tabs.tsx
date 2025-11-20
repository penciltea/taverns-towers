import { CAMPAIGN_TABS } from "@/constants/campaign.options";
import FormTabs from "@/components/Form/FormTabs";

type Props = {
  tab: number;
  setTab: (newTab: number) => void;
};

export default function CamapignFormTabs({ tab, setTab }: Props) {
  return (
    <FormTabs
      tab={tab}
      setTab={setTab}
      labels={CAMPAIGN_TABS}
      ariaLabelPrefix="Campaign"
    />
  );
}
