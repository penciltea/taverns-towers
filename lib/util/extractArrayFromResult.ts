// currently in use for rule generation
/*
    Example usage:
    For fields that return strings:
    const settlementSizeClientele = extractArrayFromResult(
        results[0],
        (val) => val.clientele,
        BaseClienteleBySettlementSizeMapping[settlementSize as SizeTypes] ?? []
    );

    For fields that return arrays:
    const settlementTagsClientele = extractArrayFromResult(
        results[2],
        (doc) => doc.clientele,
        settlementTags.flatMap((tag) => ClienteleByTagMapping[tag] ?? [])
    );
*/


export function extractArrayFromResult<T>(
  result: PromiseSettledResult<T | T[] | null>,
  extractor: (value: T) => string[] | undefined,
  fallback: string[]
): string[] {
  if (result.status === "fulfilled" && result.value) {
    if (Array.isArray(result.value)) {
      // value is array of objects — flatMap over each
      const combined = result.value.flatMap((item) => extractor(item) ?? []);
      if (combined.length > 0) return combined;
    } else {
      // value is single object
      const arr = extractor(result.value);
      if (arr && arr.length > 0) return arr;
    }
  }
  return fallback;
}
