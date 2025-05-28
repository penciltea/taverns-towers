export const siteListKey = (
  settlementId: string,
  page: number,
  limit: number,
  types: string[],
  name: string
) => ['sites', settlementId, page, limit, types, name];
