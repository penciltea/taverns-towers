import { Typography } from "@mui/material";

export default function MembershipTier({ tier } : { tier: string }){
    // ToDo: Enhance with visuals
    return (
        <Typography variant="subtitle1">Membership Tier: { tier }</Typography>
    )
}