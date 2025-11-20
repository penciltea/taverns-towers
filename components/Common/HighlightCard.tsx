import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

export default function HighlightCard({ icon, title, description }: { icon: string, title: string, description: string }){
    return (
        <Card 
            elevation={3} 
            variant="outlined" 
            sx={{ 
                flex: 1, 
                px: 2, 
                py: 3, 
                textAlign: "center"
            }}
        >
            <Typography variant="h4" gutterBottom>{ icon }</Typography>
            <Typography variant="h5" gutterBottom>{ title }</Typography>
            <Typography>{ description }</Typography>
        </Card>
    )
}