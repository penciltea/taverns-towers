import { Stack, Box, Avatar, Typography, Button } from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Link from "next/link"

export default function DashboardProfile({ username, email }: { username: string; email: string}){
    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'center', justifyItems: 'center' }}>
                <Box>
                    <Avatar sx={{ width: 70, height: 70, mr: 1 }}>
                        <PersonOutlineIcon sx={{ width: 50, height: 50}} />
                    </Avatar>
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
                    component={Link}
                    href="/account/edit"
                    disabled
                >
                    edit profile
                </Button>
            
            </Box>
        </>    
    )
}