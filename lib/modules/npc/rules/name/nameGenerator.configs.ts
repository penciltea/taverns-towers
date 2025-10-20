export const npcNameGeneratorConfigs: Record<string, {
  fallbackFormats: string[];
  allowedKeys?: string[];
}> = {
  human: {
    fallbackFormats: ["{{first}} {{last}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "fullName", "nickname", "format"],
  },
  gnome: {
    fallbackFormats: ["{{first}} '{{nickname}}' {{last}}", "{{first}} {{last}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "nickname", "format"],
  },
  tiefling: {
    fallbackFormats: ["{{fullName}}", "{{first}}"],
    allowedKeys: ["prefix", "suffix", "fullName", "first", "last", "nickname", "format"],
  },
  default: {
    fallbackFormats: ["{{first}} {{last}}", "{{fullName}}"],
    allowedKeys: ["prefix", "suffix", "first", "last", "nickname", "fullName", "format"],
  }
};