'use client';

import AuthGate from '@/components/Auth/AuthGuard';
import { useAuthStore } from '@/store/authStore';
import DashboardSection from "@/components/Dashboard/DashboardSection";
import { Avatar, Box, Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link"
import { userTier } from '@/constants/user.options';
import { toTitleCase } from '@/lib/util/stringFormats';
import ThemedButton from '@/components/Common/ThemedButton';
import DashboardActivity from '@/components/Dashboard/DashboardActivity';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function AccountDashboard(){
    const user = useAuthStore(state => state.user);
    
    return (
        <AuthGate fallbackText="You must be logged in to view your account.">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Account Dashboard</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'stretch' }}>

                    <DashboardSection 
                        titleComponent="h2" 
                        titleText="User Profile"
                        footer={
                            <Button
                                variant="outlined"
                                component={Link}
                                href="/account/edit"
                            >
                                edit profile
                            </Button>
                        }
                    >
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'center', justifyItems: 'center' }}>
                            <Box>
                                <Avatar sx={{ width: 70, height: 70, mr: 1 }}>
                                    <PersonOutlineIcon sx={{ width: 50, height: 50}} />
                                </Avatar>
                            </Box>
                            <Box>
                                <Typography>Username: { user?.username ?? "N/A" }</Typography>
                                <Typography>Email: { user?.email ?? "N/A" } </Typography>
                            </Box>
                        </Stack>
                    </DashboardSection>
                    
                    <DashboardSection 
                        titleComponent="h3" 
                        titleText="Membership"
                        footer={
                            <ThemedButton href="account/membership" text="manage membership" />
                        }
                    >
                        <Typography>Membership Tier: { toTitleCase(user?.tier ?? userTier[0]) } </Typography>
                        <Typography>Benefits: TBD</Typography>
                    </DashboardSection>
                </Stack>
                
                <DashboardActivity />
            </Paper>
        </AuthGate>
    )
}