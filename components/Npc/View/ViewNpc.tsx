'use client';

import { Session } from 'next-auth';
import { useUIStore } from '@/store/uiStore';
import { Box, Grid, Stack, Typography, Divider } from "@mui/material";
import FabButton from "@/components/Common/fabButton";
import { Npc } from "@/interfaces/npc.interface";

interface Props {
  npc: Npc;
  session: Session | null;
}


export default function ViewNpc({ npc, session }: Props){
    const { setOpenDialog } = useUIStore();

    return (
        <p>{npc.name}</p>
    )
}