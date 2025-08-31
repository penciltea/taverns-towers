'use server' 

import { ObjectId } from "mongodb";
import { Npc } from "@/interfaces/npc.interface";
import NpcModel from "@/lib/models/npc.model";
import Settlement from "@/lib/models/settlement.model";
import Site from "@/lib/models/site.model";
import { NpcConnectionType } from "@/constants/npc.options";

export interface ConnectionInput {
  type: string;
  id: string | ObjectId;
  role?: string;
  label?: string;
}

export async function resolveConnectionNames(connections: Npc['connections'] = []) {
  return Promise.all(
    connections.map(async (conn) => {
      try {
        let name = '[Unknown]';

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

        return {
          type: conn.type as NpcConnectionType,
          id: conn.id.toString?.() ?? conn.id,
          role: conn.role ?? '',
          name
        };
      } catch (error) {
        console.error(`Error resolving connection ${conn.type} (${conn.id}):`, error);
        return {
          type: conn.type as NpcConnectionType,
          id: conn.id.toString?.() ?? conn.id,
          role: conn.role ?? '',
          name
        };
      }
    })
  );
}