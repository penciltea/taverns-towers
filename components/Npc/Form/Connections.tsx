import { useFormContext } from "react-hook-form";
import { Box, CircularProgress, Typography } from "@mui/material";
import { FormConnectionAccordion } from "@/components/Form/FormConnectionAccordion";
import { NPC_CONNECTION_GUILD_ROLE, NPC_CONNECTION_NPC_ROLE, NPC_CONNECTION_SETTLEMENT_ROLE, NPC_CONNECTION_SITE_ROLE } from "@/constants/npc.options";
import { useOwnedSettlementsQuery } from "@/hooks/settlement.query";
import { useOwnedNpcsQuery } from "@/hooks/npc.query";
import { useOwnedSitesQuery } from "@/hooks/site.query";

export default function NpcFormConnections(){
    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const { data: settlementsData, isLoading: settlementsLoading } = useOwnedSettlementsQuery({}, { isEnabled: true });
    const { data: sitesData, isLoading: sitesLoading } = useOwnedSitesQuery({}, { isEnabled: true });
    const { data: npcsData, isLoading: npcsLoading } = useOwnedNpcsQuery({}, { isEnabled: true });

    const rawConnections = watch("connections");
    const connections = Array.isArray(rawConnections) ? rawConnections : [];

    const handleConnectionsChange = (type: string, updated: any[]) => {
        const currentConnections = watch("connections");
        const existing = Array.isArray(currentConnections) ? currentConnections : [];
        const others = existing.filter((c) => c?.type !== type);
        const updatedWithType = updated.map((c) => ({ ...c, type }));
        setValue("connections", [...others, ...updatedWithType]);
    };

    // Format query results into { id, name }
    const formatOptions = (items?: any[]) => {
        return (items ?? []).map((item) => ({
        id: item._id,
        name: item.name,
        }));
    };

    // Reusable loading or no-data check
    const renderAccordion = ({
        label,
        type,
        loading,
        options,
        roleOptions,
    }: {
        label: string;
        type: string;
        loading: boolean;
        options: { id: string; name: string }[];
        roleOptions: { label: string; value: string; }[];
    }) => {
        if (loading) {
        return (
            <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
                {label}
            </Typography>
            <CircularProgress size={24} />
            </Box>
        );
        }

        if (options.length === 0) {
        return (
            <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
                {label}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                No {label.toLowerCase()} found.
            </Typography>
            </Box>
        );
        }

        return (
        <Box sx={{ mb: 2 }}>
            <FormConnectionAccordion
            label={label}
            control={control}
            availableOptions={options}
            roleOptions={roleOptions}
            value={connections.filter((c: any) => c.type === type)}
            onChange={(updated) => handleConnectionsChange(type, updated)}
            namePrefix={`connections.${type}`}
            />
        </Box>
        );
    };

    return (
        <>
            {renderAccordion({
                label: "Settlements",
                type: "settlement",
                loading: settlementsLoading,
                options: formatOptions(settlementsData?.settlements),
                roleOptions: NPC_CONNECTION_SETTLEMENT_ROLE,
            })}
            {renderAccordion({
                label: "Sites",
                type: "site",
                loading: sitesLoading,
                options: formatOptions(sitesData?.sites),
                roleOptions: NPC_CONNECTION_SITE_ROLE,
            })}
            {renderAccordion({
                label: "NPCs",
                type: "npc",
                loading: npcsLoading,
                options: formatOptions(npcsData?.npcs),
                roleOptions: NPC_CONNECTION_NPC_ROLE,
            })}
        </>
    );
}