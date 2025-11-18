import { useGetFavorites } from "@/hooks/user/user.query"
import { Box, Divider, List, ListItem, ListItemText, Typography } from "@mui/material";
import NextMuiLink from "../Common/NextMuiLink";
import { RecentItem } from "@/interfaces/user.interface";

export default function DashboardFavorites(){
    const { data: activityResult, isLoading, isError } = useGetFavorites();

    const items: RecentItem[] = activityResult?.success ? activityResult.data : [];

    return (
        <Box>
            {isLoading && <Typography>Loading favorite items...</Typography>}
            {isError && <Typography color="error">Something went wrong loading your featured items.</Typography>}

            {!isLoading && !isError && (
                <>
                    <Typography variant="body2" color="text.secondary">Below are your favorite items. Tap or click an item to view them!</Typography>               
                    {items.length > 0 ? (
                        <List>
                            {items.map((item) => (
                                <Box key={item._id}>
                                    <ListItem
                                        component={NextMuiLink}
                                        href={`/${item.type}s/${item._id}`}
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
                        <Typography sx={{ marginTop: 1 }}>No featured items found.</Typography>
                    )}
                </>
            )}
        </Box>
    )
}