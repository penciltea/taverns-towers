'use server' 

import { ObjectId } from "mongodb";
import { Npc } from "@/interfaces/npc.interface";
import NpcModel from "@/lib/models/npc.model";
import Settlement from "@/lib/models/settlement.model";
import Site from "@/lib/models/site.model";
import { NpcConnectionType } from "@/constants/npc.options";
import { ActionResult } from "@/interfaces/server-action.interface";
import { safeServerAction } from "./safeServerAction.actions";

export interface ConnectionInput {
  type: string;
  id: string | ObjectId;
  role?: string;
  label?: string;
}

export interface ResolvedConnection {
  type: NpcConnectionType;
  id: string;
  role: string;
  name: string;
}

export async function resolveConnectionNames(
  connections: Npc['connections'] = []
): Promise<ActionResult<ResolvedConnection[]>> {
  return safeServerAction(async () => {
    const resolved: ResolvedConnection[] = await Promise.all(
      connections.map(async (conn) => {
        let name = '[Unknown]';

        try {
          switch (conn.type) {
            case 'settlement': {
              const doc = await Settlement.findById(conn.id)
                .select('name')
                .lean<{ name: string }>();
              name = doc?.name ?? '[Unknown Settlement]';
              break;
            }
            case 'site': {
              const doc = await Site.findById(conn.id)
                .select('name')
                .lean<{ name: string }>();
              name = doc?.name ?? '[Unknown Site]';
              break;
            }
            case 'npc': {
              const doc = await NpcModel.findById(conn.id)
                .select('name')
                .lean<{ name: string }>();
              name = doc?.name ?? '[Unknown NPC]';
              break;
            }
          }
        } catch (error) {
          console.error(`Error resolving connection ${conn.type} (${conn.id}):`, error);
        }

        return {
          type: conn.type as NpcConnectionType,
          id: conn.id.toString?.() ?? conn.id,
          role: conn.role ?? '',
          name,
        };
      })
    );

    return resolved;
  });
}