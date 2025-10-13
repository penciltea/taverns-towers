import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function TermsOfService(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>RealmFoundry - Terms of Service</Typography>
            <Typography variant="subtitle2" gutterBottom>Last updated: 19/09/2025</Typography>

            <Box mt={4}>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Welcome to RealmFoundry! These Terms of Service (&quot;Terms&quot;) govern your use of our web application, website, and related services (collectively, the &quot;Service&quot;). By accessing or using RealmFoundry, you agree to these Terms.
                </Typography>

                <Typography variant="h6">1. Eligibility</Typography>
                <Typography variant="body1">
                    You must be at least 13 years old to use RealmFoundry. If under 18, you need parental or guardian consent.
                </Typography>

                <Typography variant="h6">2. Accounts</Typography>
                <Typography variant="body1">
                    You are responsible for your account security and activity. Don&apos;t share your login credentials.
                </Typography>

                <Typography variant="h6">3. Use of the Service</Typography>
                <Typography variant="body1">
                    You agree not to:
                </Typography>
                <ul>
                    <li>
                        <Typography variant="body1">
                            Break laws or regulations.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Disrupt or interfere with the Service.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            Post illegal, harmful, or abusive content.
                        </Typography>
                    </li>
                </ul>

                <Typography variant="h6">4. Premium Features & Patreon</Typography>
                <Typography variant="body1">
                    Some features are premium. Connecting Patreon may unlock features based on your tier. Payments, cancellations, and refunds are handled through Patreon.
                </Typography>

                <Typography variant="h6">5. Intellectual Property</Typography>
                <Typography variant="body1">
                    RealmFoundry branding, design, and code belong to us. You retain ownership of content you create (settlements, NPCs, notes, etc.).
                </Typography>

                <Typography variant="h6">6. Termination</Typography>
                <Typography variant="body1">
                    We may suspend or terminate accounts that violate these Terms.
                </Typography>

                <Typography variant="h6">7. Disclaimer</Typography>
                <Typography variant="body1">
                    RealmFoundry is provided &quot;as is.&quot; We don&apos;t guarantee uninterrupted or error-free service.
                </Typography>

                <Typography variant="h6">8. Liability</Typography>
                <Typography variant="body1">
                    We&apos;re not liable for indirect, incidental, or consequential damages arising from use of the Service.
                </Typography>

                <Typography variant="h6">9. Updates</Typography>
                <Typography variant="body1">
                    We may update these Terms. Continued use means you accept the new Terms.
                </Typography>

                <Typography variant="h6">10. Contact</Typography>
                <Typography variant="body1">
                    Questions? Reach us at realmfoundryapp@gmail.com.
                </Typography>
            </Box>
        </Paper>
    )
}