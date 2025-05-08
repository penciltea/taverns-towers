export const sightListKey = (
    settlementId: string,
    page: number,
    limit: number,
    type?: string[],
    name?: string
  ) => ['sights', settlementId, page, limit, type, name];