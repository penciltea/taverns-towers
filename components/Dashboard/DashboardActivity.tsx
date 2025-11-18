'use client'

import { useRecentActivityQuery } from "@/hooks/user/user.query";
import { RecentItem } from "@/interfaces/user.interface";
import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import NextMuiLink from "../Common/NextMuiLink";

export default function DashboardActivity(){
    const { data: activityResult, isLoading, isError } = useRecentActivityQuery(5);

    const items: RecentItem[] = activityResult?.success ? activityResult.data : [];

    function handleNavigation(item: RecentItem) {
        switch (item.type) {
            case 'npc':
            case 'settlement':
                return `/${item.type}s/${item._id}/edit`;
            case 'site':
                if (!item.settlementId) return `/settlements/wilderness/sites/${item._id}`;
                return `/settlements/${item.settlementId}/sites/${item._id}`;
            default:
                return '/';
        }
    }

    return (
        <Box>
            {isLoading && <Typography>Loading recent activity...</Typography>}
            {isError && <Typography color="error">Something went wrong loading your activity.</Typography>}

            {!isLoading && !isError && (
                <>
                    <Typography variant="body2" color="text.secondary">Below are your most recent works. Tap or click an item to resume crafting!</Typography>
                    {items.length > 0 ? (
                        <List>
                            {items.map((item: RecentItem) => (
                                <Box key={`${item.type}-${item._id}`}>
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
                                        primary: { color: "info.main", fontWeight: "bold" },
                                        secondary: {
                                        textTransform:
                                            item.type === "npc" ? "uppercase" : "capitalize",
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
    )
}