'use server';

import connectToDatabase from "@/lib/db/connect";
import NpcModel from "@/lib/models/npc.model";
import SiteModel from "@/lib/models/site.model";
import SettlementModel from "@/lib/models/settlement.model";
import { NPC_ROLE_PAIRS } from "@/constants/npc.options";
import { ActionResult } from "@/interfaces/server-action.interface";
import { AppError } from "../errors/app-error";
import { safeServerAction } from "./safeServerAction.actions";

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


export async function addConnection(
  input: AddConnectionInput
): Promise<ActionResult<{ sourceId: string; targetId: string; sourceType: string; targetType: string; role: string; targetRole: string }>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const { sourceType, sourceId, targetType, targetId, role } = input;
    const TargetModel = MODEL_MAP[targetType];

    if (!TargetModel) {
      throw new AppError(`Unsupported connection type: ${sourceType} or ${targetType}`, 400);
    }

    const reciprocalRole = NPC_ROLE_PAIRS[role] ?? role;

    // Remove any existing connection
    await TargetModel.findByIdAndUpdate(targetId, {
      $pull: { connections: { type: sourceType, id: sourceId } },
    });

    // Add new connection with updated role
    await TargetModel.findByIdAndUpdate(targetId, {
      $push: { connections: { type: sourceType, id: sourceId, role: reciprocalRole } },
    });

    return {
      sourceId, 
      targetId, 
      sourceType, 
      targetType,
      role, 
      targetRole: reciprocalRole
    }
  })
}



export async function deleteConnection(
  input: AddConnectionInput
): Promise<ActionResult<{ sourceId: string; targetId: string; sourceType: string; targetType: string }>> {
  return safeServerAction(async () => {
    await connectToDatabase();

    const { sourceType, sourceId, targetType, targetId } = input;
    const TargetModel = MODEL_MAP[targetType];

    if (!TargetModel) {
      throw new AppError(`Unsupported connection type: ${sourceType} or ${targetType}`, 400);
    }

    if (!sourceId || !targetId) {
      throw new AppError("Invalid source or target ID for connection deletion", 400);
    }

    const updatedDoc = await TargetModel.findByIdAndUpdate(
      targetId,
      { $pull: { connections: { type: sourceType, id: sourceId } } },
      { new: true }
    );

    if (!updatedDoc) {
      throw new AppError(
        `Failed to delete connection: ${targetType} with id ${targetId} not found`,
        404
      );
    }

    return {
      sourceId, 
      targetId, 
      sourceType, 
      targetType
    };
  })
}
