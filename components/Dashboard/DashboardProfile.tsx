import { Stack, Box, Typography, Button } from "@mui/material";
import Link from "next/link";
import UserAvatar from "../Common/UserAvatar";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

export default function DashboardProfile({ username, email, avatar, emailVerified }: { username: string; email: string, avatar?: string, emailVerified: boolean | null}){
    return (
        <>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'center', justifyItems: 'center' }}>
                <Box>
                    <UserAvatar username={ username } avatar={ avatar ?? "" } width={150} height={150} />
                </Box>
                <Box>
                    <Typography>Username: { username }</Typography>
                    <Typography>Email: { email } </Typography>
                    { ( !emailVerified && emailVerified === false ) && 
                        (
                            <Box>                                
                                <Typography><WarningAmberIcon fontSize="small" />  Email hasn&apos;t been verified</Typography>
                            </Box>
                        )
                    }
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
                >
                    edit profile
                </Button>
            
            </Box>
        </>    
    )
}