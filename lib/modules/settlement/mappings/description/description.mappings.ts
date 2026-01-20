import { SizeTypes } from "@/constants/settlement.options";
import { SettlementDescriptionType } from "../../rules/normalize";

export const SettlementDescriptionTemplates = [
    (settlement: SettlementDescriptionType) => 
        `This is a ${settlement.sizeDescription}`
]

export const SettlementSizeText: Record<SizeTypes, string[]> = {
    "City": [
        "sprawling city",
        "densely packed city",
        "broad cityscape",
        "bustling urban center"
    ],
    "Encampment": [
        "scattered encampment",
        "temporary cluster of shelters",
        "series of tents and wagons"
    ],
    "Hamlet": [
        "small hamlet",
        "handful of homes and buildings",
        "small roadside hamlet",
        "scattered cluster of cottages"
    ],
    "Metropolis": [
        "thriving metropolis", 
        "towering sea of districts",
        "immense urban sprawl",
        "expansive cityscape"
    ],
    "Town": [
        "growing town",
        "up and coming town",
        "small town",
        "well-traveled town"
    ],
    "Village": [
        "village of simple homes and buildings",
        "quiet collection of cottages",
        "modest village"
    ]
};

