export const release20250911 = {
  title: "Version 0.2.0-alpha",
  date: "2025-09-11",
  features: [
    "Hidden site type: Updated the following fields to be a multi-select list of options for improved UX: Known To, Defense(s), Purpose",
    "Hidden site type: Fleshed out generator logic for the following fields: Secrecy level, Known To, Defense(s), Purpose",
    "Added support to allow users to register and login with Patreon accounts",
    "Added user dashboard page with user account information and recent activity",
    "Added limits to creating the number of NPCs, Sites, and Settlements a user can create based on their account membership tier",
  ],
  improvements: [
    "Improved initial page loading speed",
    "Improved login and register UI/UX and added ability to reset password and user profile/account information",
    "Added a page to view all wilderness / no settlements sites"
  ],
  bugFixes: [
    "Fixed issue with tavern generation data",
    "Fixed bug in 'create site' dialog that showed improper settlement names",    
    "Updated ' create site' dialog so that users who are not logged in don't see an empty settlement list",
    "Added check to 'view all sites' page to check if user is logged in first",
    "Settlements: Removed unnecessary 'leadership' field from form",
    "Fixed an issue on the 'view all sites' page where all sites were being displayed, even if not created by the user",
    "User creation/update: Fixed issue where password wasn't being validated correctly",
    "Guild site type: Fixed an issue where 'Probationary Period' as a randomly generated value wasn't accepted",
    "Fixed an issue where sometimes the generators would pick 'Random' as the value for a field instead of a proper value"
  ],
  knownIssues: [
    "When creating a site in the wilderness, pressing 'Generate Missing Fields' does not generate environmental fields"
  ]
};