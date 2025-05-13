'use server'

import connectToDatabase from "@/lib/db/connect";
import GeneratorFragment from "@/lib/models/generatorFragment.model";

export async function generateSettlementName(): Promise<string> {
  await connectToDatabase();

  const fragments = await GeneratorFragment.find().lean();

  const prefixes = fragments.filter(f => f.type === "prefix");
  const suffixes = fragments.filter(f => f.type === "suffix");

  const randomFromWeighted = (items: typeof fragments) => {
    const weightedList = items.flatMap(item => Array(item.weight || 1).fill(item.value));
    return weightedList[Math.floor(Math.random() * weightedList.length)];
  };

  const prefix = randomFromWeighted(prefixes);
  const suffix = randomFromWeighted(suffixes);

  return `${prefix}${suffix}`;
}
