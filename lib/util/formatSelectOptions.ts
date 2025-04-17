// Use this util function in combination with the FormSelect component 
// which expects to go through an array with objects that look like { value: "text", label: "text" }

export const toSelectOptions = (arr: string[]) =>
arr.map((item) => ({
    value: item,
    label: item,
}));