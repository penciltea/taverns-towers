export function convertCpToCurrency(cp: number): {
  gp: number;
  sp: number;
  cp: number;
} {
  const gp = Math.floor(cp / 100);
  cp = cp % 100;

  const sp = Math.floor(cp / 10);
  cp = cp % 10;

  return { gp, sp, cp };
}

export function formatCurrencyFromCp(cp: number): string {
  const { gp, sp, cp: remainingCp } = convertCpToCurrency(cp);

  const parts: string[] = [];

  if (gp > 0) parts.push(`${gp} gp`);
  if (sp > 0) parts.push(`${sp} sp`);
  if (remainingCp > 0) parts.push(`${remainingCp} cp`);

  return parts.join(", ") || "0 cp"; // fallback if cp = 0
}