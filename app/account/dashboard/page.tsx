'use client';

import AuthGate from '@/components/Auth/AuthGuard';
import { useAuthStore } from '@/store/authStore';
import DashboardSection from "@/components/Dashboard/DashboardSection";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DashboardActivity from '@/components/Dashboard/DashboardActivity';

import MembershipPanel from '@/components/Dashboard/Memberships';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';

export default function AccountDashboard(){
    const user = useAuthStore(state => state.user);
    const hasNativeAccount = Boolean(user?.username || user?.email);
    
    return (
        <AuthGate fallbackText="You must be logged in to view your account.">
            <Box>
                <Typography variant="h4" component="h1" gutterBottom>Account Dashboard</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2}}>
                    {/* Displaying user profile section for non-patreon users*/}
                    {hasNativeAccount && 
                        <DashboardSection 
                            titleComponent="h2" 
                            titleText="User Profile"
                        >
                            <DashboardProfile username={user?.username ?? "N/A"} email={ user?.email ?? "N/A" } avatar={ user?.avatar ?? ""} />
                        </DashboardSection>
                    }

                    <DashboardSection
                        titleComponent="h3"
                        titleText="Featured Items"
                    >
                        <Typography>A placeholder for creator&apos;s favorites</Typography>
                    </DashboardSection>

                    <DashboardSection 
                        titleComponent="h4" 
                        titleText="Membership"
                    >
                        <MembershipPanel user={user!} /> {/* User is non-null because of AuthGate wrapper only displaying content if user is logged in */}
                    </DashboardSection>
                </Stack>
                
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                    <DashboardActivity />
                </Paper>
            </Box>
        </AuthGate>
    )
}