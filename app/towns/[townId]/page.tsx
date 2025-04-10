import { useRouter } from "next/navigation";
import TownScreen from "@/components/town/TownScreen";


export default async function ViewTown({
  params,
}: {
  params: Promise<{ townId: string }>
}) {
  const { townId } = await params;

  return (
    <TownScreen townId={townId} />
  )
}
