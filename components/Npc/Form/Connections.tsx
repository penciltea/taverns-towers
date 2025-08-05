import { useFormContext } from "react-hook-form";
import { Box } from "@mui/material";
import { FormConnectionAccordion } from "@/components/Form/FormConnectionAccordion";
import { NPC_CONNECTION_GUILD_ROLE, NPC_CONNECTION_NPC_ROLE, NPC_CONNECTION_SETTLEMENT_ROLE, NPC_CONNECTION_SITE_ROLE } from "@/constants/npc.options";

export default function NpcFormConnections(){
    const {
        control,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const testOptions = [
        { id: "6883a1a662810ab9ea25446d", name: "Dog" },
        { id: "6884219e74483a83148ad1d6", name: "Cat" },
        { id: "688a77b913d1d6d03bd86768", name: "Rabbit" },
    ];

    const rawConnections = watch("connections");
    const connections = Array.isArray(rawConnections) ? rawConnections : [];
    console.log("connections from watch:", rawConnections);

    const handleConnectionsChange = (type: string, updated: any[]) => {
        const currentConnections = watch("connections");

        // If the current value is not an array, reset to an empty array
        const existing = Array.isArray(currentConnections) ? currentConnections : [];

        // Filter out existing connections of this type
        const others = existing.filter((c) => c?.type !== type);

        // Add back the updated ones with enforced type
        const updatedWithType = updated.map((c) => ({
            ...c,
            type,
        }));

        // Set the new full connections array
        setValue("connections", [...others, ...updatedWithType]);
    };


    return (
        <>
            <Box sx={{mb: 2}}>
                <FormConnectionAccordion
                    label="Settlements"
                    control={control}
                    availableOptions={testOptions}
                    roleOptions={NPC_CONNECTION_SETTLEMENT_ROLE}
                    value={connections.filter((c: any) => c.type === "settlement")}
                    onChange={(updated) => handleConnectionsChange("settlement", updated)}
                    namePrefix="connections.settlement"
                />
            </Box>
            <Box sx={{mb: 2}}>
                <FormConnectionAccordion
                    label="Sites"
                    control={control}
                    availableOptions={testOptions}
                    roleOptions={NPC_CONNECTION_SITE_ROLE}
                    value={connections.filter((c: any) => c.type === "site")}
                    onChange={(updated) => handleConnectionsChange("site", updated)}
                    namePrefix="connections.site"
                />
            </Box>
            <Box sx={{mb: 2}}>
                <FormConnectionAccordion
                    label="NPCs"
                    control={control}
                    availableOptions={testOptions}
                    roleOptions={NPC_CONNECTION_NPC_ROLE}
                    value={connections.filter((c: any) => c.type === "npc")}
                    onChange={(updated) => handleConnectionsChange("npc", updated)}
                    namePrefix="connections.npc"
                />
            </Box>
            <Box>
                <FormConnectionAccordion
                    label="Guilds & Factions"
                    control={control}
                    availableOptions={testOptions}
                    roleOptions={NPC_CONNECTION_GUILD_ROLE}
                    value={connections.filter((c: any) => c.type === "guild")}
                    onChange={(updated) => handleConnectionsChange("guild", updated)}
                    namePrefix="connections.guild"
                />
            </Box>
        </>
    );
};