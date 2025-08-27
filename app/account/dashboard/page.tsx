import { Paper, Typography } from "@mui/material";

export default function AccountDashboard(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1">Account Dashboard</Typography>
            <Typography variant="body1">Account dashboard features coming soon!</Typography>       
        </Paper>
        
    )
}