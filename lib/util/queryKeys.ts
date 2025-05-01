export const locationListKey = (
    settlementId: string,
    page: number,
    limit: number,
    type?: string[],
    name?: string
  ) => ['locations', settlementId, page, limit, type, name];