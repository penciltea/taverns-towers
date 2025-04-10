import { Town } from "@/interfaces/town.interface";

export async function getTownById(id: string): Promise<Town> {
  const res = await fetch(`/api/towns?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch town");
  return res.json();
}