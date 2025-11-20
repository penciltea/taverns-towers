import { Box, Paper, Typography } from "@mui/material";

export default function AboutCampaignsPage(){
    return (
        <Box sx={{ py: 3, px: { xs: 2, sm: 4 } }}>
            <Paper elevation={3} sx={{ padding: 4 }}>
                <Typography variant="h4" component="h1" textAlign="center" sx={{ marginBottom: 2 }}>About Campaigns</Typography>
                <Typography variant="h4" component="h1" gutterBottom>How Campaigns Work in RealmFoundry</Typography>
                <Typography gutterBottom>Campaigns are the heart of RealmFoundry. They bring your settlements, sites, NPCs, and worldbuilding into a single shared space that you and your players can explore together. Whether you&apos;re running a homebrew epic or a small-town mystery, campaigns let you organize and present your world exactly the way you want.</Typography>

                <Typography variant="h4" component="h2" gutterBottom sx={{ marginTop: 5 }}>What is a Campaign?</Typography>
                <Typography gutterBottom>A campaign is a dedicated workspace that collects your world&apos; content into one place. Campaigns are designed with collaboration in mind, allowing you and your players to explore and build your worlds together.</Typography>

                <Typography gutterBottom>Campaigns can be created and managed by users with an Artisan or Architect membership. Players can be invited to any campaign for free.</Typography>
                <Typography>Inside a campaign, you can: </Typography>
                <ul>
                    <li>Create content exclusively visible within that campaign</li>
                    <li>Control what your players can see, create, or edit</li>
                    <li>Share your world with your table, whether it&apos;s online or in person</li>
                    <li>Save and share links to your game&apos;s VTT URL or other external sites</li>
                    <li>Keep track of notes, lore, and session material (coming soon!)</li>
                </ul>

                <Typography variant="h4" component="h2" gutterBottom sx={{ marginTop: 5 }}>Active Campaigns</Typography>
                <Typography gutterBottom>If you have either created a campaign or have been listed as a player of a campaign, you can choose to make that campaign your Active Campaign. You can select one campaign to be your Active Campaign at any time. You can select or change your Active Campaign by viewing the campaign&apos;s details and selecting &quot;Set as Active Campaign&quot;.</Typography>
                <Typography gutterBottom>When you set a campaign as your Active Campaign, you will exclusively view that campaign&apos;s content within RealmFoundry. If you have content authoring permissions, any content you create while having an Active Campaign will be associated with that campaign.</Typography>
                <Typography gutterBottom>If you have no Active Campaign set, you will be able to see and manage your content that you have created outside of the context of a campaign.</Typography>
                

                <Typography variant="h4" component="h3" gutterBottom sx={{ marginTop: 5 }}>Roles in Campaigns</Typography>
                <Typography variant="h5" component="p" gutterBottom sx={{ textDecoration: 'underline' }}>Campaign Owner (GM)</Typography>
                <Typography>The Campaign Owner (usually the Game Master or GM) has complete control over the campaign&apos;s settings and permissions. They always retain ultimate control in campaigns and is the only role that can delete campaigns.</Typography>
                <Typography>They can:</Typography>
                
                <ul>
                    <li>Add or remove content</li>
                    <li>Invite players and co-GMs</li>
                    <li>Create custom data for the campaign to use (custom races, pantheons, and more)</li>
                    <li>Manage visibility (what is hidden or what others can see)</li>
                    <li>Can see &quot;GM Notes&quot; fields on content</li>
                    <li>Configure player access options</li>
                    <li>Archive or delete the campaign</li>
                </ul>

                <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: 3, textDecoration: 'underline' }}>Co-GM</Typography>
                <Typography>A Co-GM shares most of the Campaign Owner&apos;s permissions and can help manage worldbuilding or run sessions.</Typography>
                <Typography>Co-GMs can:</Typography>

                <ul>
                    <li>Create and edit content</li>
                    <li>Reveal or hide information</li>
                    <li>Help administrate the campaign</li>
                    <li>Can see &quot;GM Notes&quot; fields on content</li>
                </ul>

                <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: 3, textDecoration: 'underline' }}>Editors</Typography>
                <Typography>Editors are players who have access to create their own content as well as edit other players&apos; content. They cannot help administrate the campaign but they do have access to editing permissions for content in a campaign.</Typography>
                <Typography>Editors can:</Typography>

                <ul>
                    <li>Browse content revealed to players, such as settlements or NPCs</li>
                    <li>Create and manage their own content</li>
                    <li>Manage the other campaign players&apos; content</li>
                </ul>

                <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: 3, textDecoration: 'underline' }}>Authors</Typography>
                <Typography>Authors are players who can create and manage their own content within the campaign. They do not have administration permissions for the campaign.</Typography>
                <Typography>Authors can:</Typography>

                <ul>
                    <li>Browse content revealed to players, such as settlements or NPCs</li>
                    <li>Create and manage their own content</li>
                </ul>

                <Typography variant="h5" component="p" gutterBottom sx={{ marginTop: 3, textDecoration: 'underline' }}>Players</Typography>
                <Typography>The most basic role for campaigns, Players have access to view content within a campaign. Players do not need a paid membership to join or explore revealed content.</Typography>
                <Typography>Authors can:</Typography>

                <ul>
                    <li>Browse content revealed to players, such as settlements or NPCs</li>
                </ul>
                

                <Typography variant="h4" component="p" gutterBottom sx={{ marginTop: 5 }}>Inviting Players to a Campaign</Typography>
                <Typography>When creating a campaign, Artisans and Architects have the option to add players either by username or email in the campaign interface. Once they are listed as part of the campaign, the player&apos;s roles can be managed at any time.</Typography>
                <Typography>If a username or email doesn&apos;t exist in RealmFoundry, the entered username or email will be saved as a placeholder player. A player can later join RealmFoundry and that placeholder will be converted into a proper RealmFoundry user.</Typography>

                <Typography variant="h4" component="p" gutterBottom sx={{ marginTop: 5 }}>Player Access to Campaign Owner Features</Typography>
                <Typography gutterBottom>Players don&apos;t need a paid membership to experience the full richness of a RealmFoundry campaign.</Typography>
                <Typography gutterBottom>When a player joins a campaign, they automatically gain access to the Campaign Owner&apos;s tier of features while inside that campaign, such as:</Typography>

                <ul>
                    <li>Custom data for dropdowns (races, pantheons, and more)</li>
                    <li>Exclusive themes</li>
                    <li>Additional Artisan & Architect membership features as they are developed</li>
                </ul>

                <Typography gutterBottom sx={{ marginTop: 3 }}>This ensures all players enjoy the same high-quality storytelling experience without requiring them to upgrade.</Typography>
                <Typography gutterBottom>Players do not permanently unlock these features in their own account. They simply gain access to them within the context of the campaign as long as the Campaign Owner has the associated tier of membership. If a user creates content outside of the context of a campaign, they maintain access to their own tier&apos;s features.</Typography>
                <Typography>This keeps the worldbuilding cohesive and feature-sharing intuitive but controlled.</Typography>
                

                <Typography variant="h4" component="p" gutterBottom sx={{ marginTop: 5 }}>Frequently Asked Questions</Typography>
                <Typography variant="h6" component="p">Do players need a RealmFoundry membership?</Typography>
                <Typography>No, players can join RealmFoundry for free and have access to view the campaign&apos;s content.</Typography>

                <Typography variant="h6" component="p" sx={{ marginTop: 3}}>Can I run more than one campaign?</Typography>
                <Typography>Yes! Artisan and Architect membership users can create as many campaigns as they like.</Typography>

                <Typography variant="h6" component="p" sx={{ marginTop: 3}}>Can my players create content in my campaign?</Typography>
                <Typography>The basic player role cannot create content. You may grant a player elevated permissions but this is optional.</Typography>

                <Typography variant="h6" component="p" sx={{ marginTop: 3}}>Can I hide content from my players?</Typography>
                <Typography>This feature is coming soon. Currently all content is visible to players of a campaign but Campaign Owners will soon be able to keep content hidden until they want to reveal it.</Typography>

                <Typography variant="h6" component="p" sx={{ marginTop: 3}}>Can I move settlements or NPCs into a campaign later?</Typography>
                <Typography>This feature will be coming soon!</Typography>

            </Paper>
        </Box>
    )
}