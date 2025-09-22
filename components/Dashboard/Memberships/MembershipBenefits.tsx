import { membershipBenefits } from "@/constants/user.options"
import { List, ListItem, ListItemText } from "@mui/material"

export default function MembershipBenefits({ tier }: { tier: string }){
    const membership = membershipBenefits.find((m) => m.tier === tier);

    // If no match is found, render nothing (or a fallback message)
    if (!membership) {
        return <p>No benefits found for this tier.</p>;
    }

    return (
        <List 
            sx={{
                listStyleType: 'disc',
                pl: 4,
                ml: 2,
                '& .MuiListItem-root': {
                display: 'list-item',
                },
            }}
        >
            {membership.benefits.map((benefit, index) => (
                <ListItem key={index}>
                    <ListItemText primary={benefit} />
                </ListItem>
            ))}
        </List>
    );
}