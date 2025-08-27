import { Paper, Typography } from "@mui/material";

export default function AccountSettings(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1">Account Settings</Typography>
            <Typography variant="body1">Account management features coming soon!</Typography>       
        </Paper>
        
    )
}