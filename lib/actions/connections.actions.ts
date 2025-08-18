'use server';

import connectToDatabase from "@/lib/db/connect";
import NpcModel from "@/lib/models/npc.model";
import SiteModel from "@/lib/models/site.model";
import SettlementModel from "@/lib/models/settlement.model";

// You could extend this with more as needed
const MODEL_MAP = {
  npc: NpcModel,
  site: SiteModel,
  settlement: SettlementModel,
};

interface AddConnectionInput {
  sourceType: keyof typeof MODEL_MAP;   // e.g. "npc"
  sourceId: string;                     // e.g. npcId
  targetType: keyof typeof MODEL_MAP;   // e.g. "settlement"
  targetId: string;                     // e.g. settlementId
  role: string;                         // e.g. "leader"
}

export async function addConnection({
  sourceType,
  sourceId,
  targetType,
  targetId,
  role,
}: AddConnectionInput) {
    await connectToDatabase();

    const TargetModel = MODEL_MAP[targetType];

    if (!TargetModel) {
        throw new Error(`Unsupported connection type: ${sourceType} or ${targetType}`);
    }

     // Remove any existing connection for this source
    await TargetModel.findByIdAndUpdate(targetId, {
        $pull: { connections: { type: sourceType, id: sourceId } },
    });

    // Add new connection with the updated role
    await TargetModel.findByIdAndUpdate(targetId, {
        $push: { connections: { type: sourceType, id: sourceId, role } },
    });

    return { sourceId, targetId, sourceType, targetType, role };
}
