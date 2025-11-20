import { NPC_TABS } from "@/constants/npc.options";
import FormTabs from "@/components/Form/FormTabs";

type Props = {
  tab: number;
  setTab: (newTab: number) => void;
};

export default function NpcFormTabs({ tab, setTab }: Props) {
  return (
    <FormTabs
      tab={tab}
      setTab={setTab}
      labels={NPC_TABS}
      ariaLabelPrefix="NPC"
    />
  );
}
