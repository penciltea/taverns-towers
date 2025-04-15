'use client'
import { useRouter } from "next/navigation";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type FabButtonProps = {
  label: string;
  link: string;
};

export default function FabButton({label, link}: FabButtonProps) {
  const router = useRouter();

  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label="add location"
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      onClick={() => router.push(link)}
    >
      <AddIcon /> {label}
    </Fab>
  );
}
