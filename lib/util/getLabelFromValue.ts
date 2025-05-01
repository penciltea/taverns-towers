export function getLabelFromValue<
  T extends { label: string; value: string }
>(
  options: readonly T[],
  value: T['value'] | undefined,
  fallback?: string
): string {
  if (!value) return fallback ?? "N/A";
  const match = options.find(option => option.value === value);
  return match ? match.label : fallback ?? value;
}
