import { Box, Typography, TypographyProps } from "@mui/material";

interface DashboardSectionProps {
    children: React.ReactNode;
    titleComponent: NonNullable<TypographyProps["component"]>;
    titleText: string;
    footer?: React.ReactNode;
}

export default function DashboardSection({ children, titleComponent, titleText, footer }: DashboardSectionProps){
    return (
        <Box
            sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                mb: 2,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 200,
            }}
        >
            {/* Title */}
            <Box
                sx={{
                    padding: 2
                }}
            >
                <Typography variant="h5" component={ titleComponent }>{ titleText }</Typography>
            </Box>

            {/* Content */}
            <Box sx={{ p: 2 }}>
                { children }
            </Box>

            {/* Footer */}
            {footer && (
                <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
                    {footer}
                </Box>
            )}
        </Box>
    )
}