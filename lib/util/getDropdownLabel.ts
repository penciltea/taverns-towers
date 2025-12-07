export interface DropdownOption {
    label: string;
    value: string;
}

export interface DropdownGroup {
    label: string;
    options: DropdownOption[];
}

export function getDropdownLabel(
    groups: readonly DropdownGroup[],
    value: string,
): string {
    for (const group of groups) {
        const match = group.options.find(option => option.value === value);
        if (match) return match.label;
    }

    return value; // fallback if not found
}