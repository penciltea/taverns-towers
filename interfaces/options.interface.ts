export interface Option {
  label: string;
  value: string;
}

export interface OptionGroup {
  label: string;
  options: ReadonlyArray<Option>;
}