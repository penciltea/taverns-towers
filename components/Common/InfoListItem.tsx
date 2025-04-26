import { ListItem } from "@mui/material";

type InfoListItemProps = {
    label: string;
    value?: string | number;
  };

export default function InfoListItem({ label, value }: InfoListItemProps){
    return (
        <ListItem sx={{ display: "list-item" }}>
            <strong>{ label }: </strong> { value || "N/A" }
        </ListItem>
    )
}