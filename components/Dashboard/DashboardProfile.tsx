import { Stack, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import UserAvatar from "../Common/UserAvatar";

export default function DashboardProfile({ username, email, avatar }: { username: string; email: string, avatar?: string }){
    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'center', justifyItems: 'center' }}>
                <Box>
                    <UserAvatar username={ username } avatar={ avatar ?? "" } width={150} height={150} />
                </Box>
                <Box>
                    <Typography>Username: { username }</Typography>
                    <Typography>Email: { email } </Typography>
                </Box>
            </Stack>
            <Box 
                sx={{ 
                    px: 2, 
                    py: 1, 
                    display: "flex", 
                    justifyContent: "flex-end" 
                }}
            >
                <Button
                    variant="outlined"
                    color="secondary"
                    component={Link}
                    href="/account/edit"
                >
                    edit profile
                </Button>
            
            </Box>
        </>    
    )
}