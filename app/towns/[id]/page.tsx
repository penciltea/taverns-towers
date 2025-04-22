import TownScreen from "@/components/town/View/TownScreen";

export default async function ViewTown({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  return (
    <TownScreen townId={id} />
  )
}
