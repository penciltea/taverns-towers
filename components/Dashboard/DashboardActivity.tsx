'use client'

import { useRecentActivityQuery } from "@/hooks/user/user.query";
import { RecentItem } from "@/interfaces/user.interface";
import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import NextMuiLink from "../Common/NextMuiLink";

export default function DashboardActivity(){
    const { data, isLoading, isError } = useRecentActivityQuery(5);

    function handleNavigation(item: RecentItem) {
        switch (item.type) {
            case 'npc':
            case 'settlement':
                return `/${item.type}s/${item._id}/edit`;
            case 'site':
                if (!item.settlementId) return '/'; // fallback if missing
                return `/settlements/${item.settlementId}/sites/${item._id}`;
            default:
                return '/';
        }
    }

    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 2,
                flex: 1,
                minHeight: 200,
                padding: 2
            }}
        >
            <Typography variant="h5" component="h4" gutterBottom>Recent Activity</Typography>
            <Box>
                {isLoading && <Typography>Loading recent activity...</Typography>}
                {isError && <Typography color="error">Something went wrong loading your activity.</Typography>}

                {!isLoading && !isError && (
                    <>
                        <Typography variant="body2" color="text.secondary">Below are your most recent works. Tap or click an item to resume crafting!</Typography>
                        {data && data.length > 0 ? (
                            <List>
                                {data.map((item) => (
                                    <Box key={item._id}>
                                        <ListItem
                                            component={NextMuiLink}
                                            href={handleNavigation(item)}
                                            sx={{
                                                cursor: "pointer",
                                                textDecoration: "none",
                                                color: "inherit",
                                                "&:hover": { backgroundColor: "action.hover" },
                                            }}
                                        >
                                            <ListItemText
                                                primary={item.name}
                                                secondary={item.type}
                                                slotProps={{
                                                    primary: { color: 'info.main', fontWeight: "bold" },
                                                    secondary: {
                                                        textTransform:
                                                            item.type.toLowerCase() === "npc"
                                                                ? "uppercase"
                                                                : "capitalize",
                                                    },
                                                }}
                                            />
                                        </ListItem>
                                        <Divider />
                                    </Box>
                                ))}
                            </List>
                        ) : (
                            <Typography>No recent activity found.</Typography>
                        )}
                    </>
                )}
            </Box>
        </Box>
    )
}