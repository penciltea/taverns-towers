import { Box, Paper, Typography } from "@mui/material";

export default function PrivacyPolicy(){
    return (
        <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>RealmFoundry - Privacy Policy</Typography>
            <Typography variant="subtitle2" gutterBottom>Last updated: 19/09/2025</Typography>

            <Box mt={4}>
                <Typography variant="body1" sx={{ mb: 2}}>We respect your privacy. This policy explains how RealmFoundry (&quot;we&quot;) collects, uses, and protects your information.</Typography>

                <Typography variant="h6">1. Information We Collect</Typography>
                <ul>
                    <li>
                        <Typography variant="body1"><strong>Account info:</strong> From Patreon or other logins (name, email, profile data).</Typography>
                    </li>
                    <li>
                        <Typography variant="body1"><strong>Membership info:</strong> Patreon tier and patron status.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1"><strong>App content:</strong> Settlements, NPCs, world-building notes you create.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1"><strong>Usage data:</strong> Analytics on feature usage and device type.</Typography>
                    </li>
                </ul>

                <Typography variant="h6">2. How We Use It</Typography>
                <Typography variant="body1">We use your information to:</Typography>
                <ul>
                    <li>
                        <Typography variant="body1">Provide and improve the Service.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Unlock Patreon-based premium features.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Communicate updates.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">Track trends and improve UX.</Typography>
                    </li>
                </ul>

                <Typography variant="h6">3. Sharing</Typography>
                <Typography variant="body1">We don&apos;t sell your data. We may share:</Typography>
                <ul>
                    <li>
                        <Typography variant="body1">With Patreon to verify membership.</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">With service providers (hosting, analytics).</Typography>
                    </li>
                    <li>
                        <Typography variant="body1">If required by law.</Typography>
                    </li>
                </ul>

                <Typography variant="h6">4. Data Retention</Typography>
                <Typography variant="body1">We keep your data while your account is active. You can request deletion anytime.</Typography>

                <Typography variant="h6">5. Cookies</Typography>
                <Typography variant="body1">We may use cookies or similar tech for login and performance.</Typography>

                <Typography variant="h6">6. Security</Typography>
                <Typography variant="body1">We take reasonable steps to secure data, but no system is 100% secure.</Typography>

                <Typography variant="h6">7. Children</Typography>
                <Typography variant="body1">RealmFoundry is not for kids under 13, and we don&apos;t knowingly collect their data.</Typography>

                <Typography variant="h6">8. Updates</Typography>
                <Typography variant="body1">We may revise this Policy. Changes will be posted here.</Typography>

                <Typography variant="h6">9. Contact</Typography>
                <Typography variant="body1">Privacy questions? Email realmfoundryapp@gmail.com.</Typography>
            </Box>
        </Paper>
    )
}