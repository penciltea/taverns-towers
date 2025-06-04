export const siteListKey = (
  settlementId: string,
  page: number,
  limit: number,
  name: string,  
  types: string[],
) => ['sites', settlementId, page, limit, name, types];
