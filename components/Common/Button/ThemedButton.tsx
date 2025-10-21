import Button from "@mui/material/Button";
import Link from "next/link";

interface ThemedButtonProps {
    href: string;
    text: string;
}

export default function ThemedButton({ href, text }: ThemedButtonProps){
    return (
        <Button
            variant="contained"
            sx={{
                //mt: 4,
                backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#8c5aff" : theme.palette.secondary.main,
                color: "white",
                "&:hover": {
                backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#7b3fe5" : theme.palette.secondary.dark,
                },
            }}
            component={Link}
            href={ href }
        >
            { text }
        </Button>
    )
}