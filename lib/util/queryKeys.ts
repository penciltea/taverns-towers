export const locationListKey = (
    townId: string,
    page: number,
    limit: number,
    type?: string[],
    name?: string
  ) => ['locations', townId, page, limit, type, name];