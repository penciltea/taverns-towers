export const npcNameGeneratorConfigs: Record<string, {
  fallbackFormats: string[];
  allowedKeys?: string[];
}> = {
  human: {
    fallbackFormats: ["{{first}} {{last}}"],
    allowedKeys: ["first", "last", "fullName"],
  },
  gnome: {
    fallbackFormats: ["{{first}} '{{nickname}}' {{last}}", "{{first}} {{last}}"],
    allowedKeys: ["first", "last", "nickname"],
  },
  tiefling: {
    fallbackFormats: ["{{fullName}}", "{{first}}"],
    allowedKeys: ["fullName", "first"],
  },
  // Default fallback if race isn't listed
  default: {
    fallbackFormats: ["{{first}} {{last}}"],
    allowedKeys: ["first", "last", "fullName"],
  },
};