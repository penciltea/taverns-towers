import { Card, Typography } from "@mui/material";

export default function HighlightCard({ icon, title, description }: { icon: string, title: string, description: string }){
    return (
        <Card 
            elevation={3} 
            variant="outlined" 
            sx={{ 
                flex: 1, 
                px: 2, 
                py: 3, 
                textAlign: "center", 
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
            }
        }}>
            <Typography variant="h4" gutterBottom>{ icon }</Typography>
            <Typography variant="h5" gutterBottom>{ title }</Typography>
            <Typography>{ description }</Typography>
        </Card>
    )
}