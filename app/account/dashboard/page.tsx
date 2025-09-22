'use client';

import AuthGate from '@/components/Auth/AuthGuard';
import { useAuthStore } from '@/store/authStore';
import DashboardSection from "@/components/Dashboard/DashboardSection";
import { Button, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link"
import DashboardActivity from '@/components/Dashboard/DashboardActivity';

import MembershipPanel from '@/components/Dashboard/Memberships';
import DashboardProfile from '@/components/Dashboard/DashboardProfile';

export default function AccountDashboard(){
    const user = useAuthStore(state => state.user);
    
    return (
        <AuthGate fallbackText="You must be logged in to view your account.">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                <Typography variant="h4" component="h1" gutterBottom>Account Dashboard</Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2, alignItems: 'stretch', justifyItems: 'flex-start' }}>

                    <DashboardSection 
                        titleComponent="h2" 
                        titleText="User Profile"
                    >
                        <DashboardProfile username={user?.username ?? "N/A"} email={ user?.email ?? "N/A" } />
                    </DashboardSection>

                    <DashboardSection
                        titleComponent="h3"
                        titleText="Featured Items"
                    >
                        <Typography>A placeholder for creator's favorites</Typography>
                    </DashboardSection>
                    
                    <DashboardSection 
                        titleComponent="h4" 
                        titleText="Membership"
                    >
                        <MembershipPanel user={user!} /> {/* User is non-null because of AuthGate wrapper only displaying content if user is logged in */}
                    </DashboardSection>
                </Stack>
                
                <DashboardActivity />
            </Paper>
        </AuthGate>
    )
}