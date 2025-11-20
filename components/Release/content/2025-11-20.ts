export const release20251120 = {
  title: "Version 0.3.0-beta",
  date: "2025-11-20",
  features: [
    "The Account Dashboard has received an overhauled layout",
    "Added the ability to favorite your created content",
    "Campaigns: Artisan and Architect members will be able to create campaigns, organizing content into individual campaigns",
    "Added Theme field to settlement and site forms to influence name generation",
    "Added exclusive themes for Artisan and Architect tier members",
    "All content has had a new 'Configuration' tab added to each form, support for the respective fields will be rolled out over time"
  ],
  improvements: [
    "Adding 'theme' field to site forms",
    "Provided a better user experience for error handling",
    "Added new placeholder images for sites and NPCs (with more on the way)"
  ],
  bugFixes: [
    "Tavern sites: Fixed an issue where 'size' and 'condition' field values weren't loading properly on the edit form"
  ],
  knownIssues: [
    "Content generation currently does not support the following fields: Description, Public Notes, GM Notes, Tone, NPC Likes, NPC Dislikes. Support for these fields will be rolled out over time"
  ]
};