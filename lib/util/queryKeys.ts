export const locationListKey = (
    townId: string,
    page: number,
    limit: number,
    type?: string[]
  ) => ['locations', townId, page, limit, type];