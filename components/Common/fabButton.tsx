'use client'
import { useRouter } from "next/navigation";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type FabButtonProps = {
  label: string;
  link?: string;
  onClick?: () => void;
};

export default function FabButton({ label, link, onClick }: FabButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(); // run the custom function
    } else if (link) {
      router.push(link); // navigate to the link
    }
  };

  return (
    <Fab
      variant="extended"
      color="primary"
      aria-label={label}
      sx={{ position: "fixed", bottom: 16, right: 16 }}
      onClick={handleClick}
    >
      <AddIcon /> {label}
    </Fab>
  );
}
