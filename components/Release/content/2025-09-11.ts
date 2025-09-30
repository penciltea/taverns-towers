export const release20250911 = {
  title: "Alpha Release – September 11, 2025",
  date: "2025-09-11",
  features: [
    "Hidden site type: Updated the following fields to be a multi-select list of options for improved UX: Known To, Defense(s), Purpose",
    "Hidden site type: Fleshed out generator logic for the following fields: Secrecy level, Known To, Defense(s), Purpose",
    "Added support to allow users to login with Patreon accounts",
    "Added user dashboard page with user account information and recent activity",
    "Added limits to creating the number of NPCs, Sites, and Settlements a user can create based on their account membership tier",
  ],
  improvements: [
    
  ],
  bugFixes: [
    "Fixed issue with tavern generation data",
    "Fixed bug in &apos;site creation&apos; dialog that showed improper settlement names",
    "Added check to view all sites page to check if user is logged in first",
    "Settlements: Removed unnecessary &apos;leadership&apos; field from form",
    "Fixed an issue on the View All Sites page where all sites were being displayed, even if not created by the user",
    "User creation/update: Fixed issue where password wasn't being validated correctly",
  ],
  knownIssues: [
    "The &apos;View Wilderness Sites&apos; page is currently missing content.",
    "Generators that have &apos;Random&apos; in the option list will still sometimes choose &apos;random&apos;, which isn&apos;t a valid option.",
    "When creating a site in the wilderness, pressing &apos;Generate Missing Fields&apos; does not generate environmental fields"
  ]
};