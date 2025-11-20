// Membership tiers
export const userTier = [
    "Apprentice",
    "Artisan",
    "Architect"
];

export const isPremiumTier = [
    "Charter Member",
    "Artisan", 
    "Architect",
]

export const membershipBenefits = [
    {
        "tier": "Apprentice",
        benefits: [
            "Create up to 5 Settlements",
            "Create up to 15 Sites total",
            "Create up to 5 NPCs",
            "Explore medieval fantasy content",
            "Access RealmFoundry's core features"
        ]
    },
    // Temporary testing tier
    {
        "tier": "Charter Member",
        benefits: [
            "Unlimited Settlements, Sites, and NPCs",
            "Multiple themed content options (Sci-Fi, Asian-inspired, etc.)",
            "Optional batch site generation with Settlements (coming soon!)",
            "Add custom dropdown options (races, domains, factions)",
            "Export content in JSON, PDF, or VTT-ready formats (coming soon!)",
        ]
    },
    {
        "tier": "Artisan",
        benefits: [
            "Unlimited Settlements, Sites, and NPCs",
            "Organize your worlds with Campaigns — manage content and invite players",
            "Multiple themed content options (Sci-Fi, Asian-inspired, etc.)",
            "Optional batch site generation with Settlements (coming soon!)",
            "Add custom dropdown options (races, domains, factions)",
            "Export content in JSON, PDF, or VTT-ready formats (coming soon!)",
        ]
    },
    {
        "tier": "Architect",
        benefits: [
            "All Artisan features included",
            "Early access to new generators and themes",
            "Exclusive polls and feedback channels to shape RealmFoundry",
            "Rare fragment packs and special UI badges",
            "Advanced multi-settlement templates and bundles"
        ]
    }
 ];

 export const tierLimits = [
    {
        "tier": userTier[0],
        "settlementLimit": 5,
        "siteLimit": 15,
        "npcLimit": 5
    },
    {
        "tier": userTier[1],
        "settlementLimit": -1,
        "siteLimit": -1,
        "npcLimit": -1
    },
    {
        "tier": userTier[2],
        "settlementLimit": -1,
        "siteLimit": -1,
        "npcLimit": -1
    },
    {
        "tier": userTier[3],
        "settlementLimit": -1,
        "siteLimit": -1,
        "npcLimit": -1
    }
 ];