export function getLabelFromValue<
  T extends { label: string; value: string }
>(
  options: readonly T[],
  value: T['value'],
  fallback?: string
): string {
  const match = options.find(option => option.value === value);
  return match ? match.label : fallback ?? value;
}
