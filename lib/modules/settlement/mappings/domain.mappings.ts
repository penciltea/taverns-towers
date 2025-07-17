import { SizeTypes } from "@/constants/settlementOptions";

export const domainCountBySize: Record<SizeTypes, [number, number]> = {
  Encampment: [1, 1],
  Thorp: [1, 1],
  Hamlet: [1, 2],
  Village: [2, 3],
  Town: [3, 4],
  City: [4, 6],
  Metropolitan: [5, 7],
};