export const siteListKey = (
    settlementId: string,
    page: number,
    limit: number,
    type?: string[],
    name?: string
  ) => ['sites', settlementId, page, limit, type, name];