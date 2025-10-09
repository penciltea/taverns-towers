import { Box, Paper, Typography, TypographyProps } from "@mui/material";

interface DashboardSectionProps {
    children: React.ReactNode;
    titleComponent: NonNullable<TypographyProps["component"]>;
    titleText: string;
}

export default function DashboardSection({ children, titleComponent, titleText }: DashboardSectionProps){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, flex: 1 }}>
            {/* Title */}
            <Box sx={{ padding: 2 }} >
                <Typography variant="h5" component={ titleComponent }>{ titleText }</Typography>
            </Box>

            {/* Content */}
            <Box sx={{ p: 2 }}>
                { children }
            </Box>
        </Paper>
    )
}