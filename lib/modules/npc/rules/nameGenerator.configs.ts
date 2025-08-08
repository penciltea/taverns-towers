export const npcNameGeneratorConfigs: Record<string, {
  fallbackFormats: string[];
  allowedKeys?: string[];
}> = {
  human: {
    fallbackFormats: ["{{first}} {{last}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "fullName"],
  },
  gnome: {
    fallbackFormats: ["{{first}} '{{nickname}}' {{last}}", "{{first}} {{last}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "nickname"],
  },
  tiefling: {
    fallbackFormats: ["{{fullName}}", "{{first}}"],
    allowedKeys: ["prefix", "suffix", "fullName", "first"],
  },
  // Default fallback if race isn't listed
  default: {
    fallbackFormats: ["{{first}} {{last}}", "{{fullName}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "fullName"],
  },
};