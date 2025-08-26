'use client'

import { Container, Typography, Button, Link } from "@mui/material"

export default function PatreonCta(){
    return (
        <Container sx={{ py: 8, textAlign: "center" }}>
            <Typography variant="h5" gutterBottom>Keep the furnace hot!</Typography>
            <Typography variant="body1" gutterBottom>
                Become an Alpha Adventurer on <Link target="_blank" rel="noopener noreferrer" href="https://www.patreon.com/RealmFoundry">Patreon</Link> and help shape RealmFoundry.
            </Typography>
            <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.patreon.com/RealmFoundry"
            > 
                Join as Alpha Adventurer 
            </Button>
        </Container>
    )
}