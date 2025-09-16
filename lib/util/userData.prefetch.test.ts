jest.mock("@/lib/actions/settlement.actions", () => ({
  getOwnedSettlements: jest.fn(),
}));

jest.mock("@/lib/actions/site.actions", () => ({
  getOwnedSites: jest.fn(),
}));

jest.mock("@/lib/actions/npc.actions", () => ({
  getOwnedNpcs: jest.fn(),
}));

jest.mock("@/components/Layout/QueryProviderWrapper", () => ({
  queryClient: {
    prefetchQuery: jest.fn(),
  },
}));

import { prefetchUserData } from "@/lib/util/userData.prefetch";
import { queryClient } from "@/components/Layout/QueryProviderWrapper";
import * as settlementActions from "@/lib/actions/settlement.actions";
import * as siteActions from "@/lib/actions/site.actions";
import * as npcActions from "@/lib/actions/npc.actions";
import { DefaultSettlementQueryParams } from "@/interfaces/settlement.interface";
import { DefaultSiteQueryParams } from "@/interfaces/site.interface";
import { DefaultNpcQueryParams } from "@/interfaces/npc.interface";

jest.mock("@/components/Layout/QueryProviderWrapper", () => ({
    queryClient: {
        prefetchQuery: jest.fn(),
    },
}));

jest.mock("@/lib/actions/settlement.actions");
jest.mock("@/lib/actions/site.actions");
jest.mock("@/lib/actions/npc.actions");

describe("prefetchUserData", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("calls prefetchQuery for settlements, sites, and NPCs", async () => {
        (settlementActions.getOwnedSettlements as jest.Mock).mockResolvedValue([]);
        (siteActions.getOwnedSites as jest.Mock).mockResolvedValue([]);
        (npcActions.getOwnedNpcs as jest.Mock).mockResolvedValue([]);

        await prefetchUserData();

        expect(queryClient.prefetchQuery).toHaveBeenCalledTimes(3);

        expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
            queryKey: ["ownedSettlements", DefaultSettlementQueryParams],
            queryFn: expect.any(Function),
        });

        expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
            queryKey: ["ownedSites", DefaultSiteQueryParams],
            queryFn: expect.any(Function),
        });

        expect(queryClient.prefetchQuery).toHaveBeenCalledWith({
            queryKey: ["ownedNpcs", DefaultNpcQueryParams],
            queryFn: expect.any(Function),
        });
    });

    it("prefetchQuery functions call the correct action functions", async () => {
        const settlementsSpy = jest
        .spyOn(settlementActions, "getOwnedSettlements")
        .mockResolvedValue({
            success: true,
            settlements: [],
            total: 0,
            currentPage: 1,
            totalPages: 0,
        });

        const sitesSpy = jest
        .spyOn(siteActions, "getOwnedSites")
        .mockResolvedValue({
            success: true,
            sites: [],
            total: 0,
            currentPage: 1,
            totalPages: 0,
        });

        const npcsSpy = jest
        .spyOn(npcActions, "getOwnedNpcs")
        .mockResolvedValue({
            success: true,
            npcs: [],
            total: 0,
            currentPage: 1,
            totalPages: 0,
        });

        await prefetchUserData();

        // Invoke the queryFn manually to test it
        const settlementsCall = (queryClient.prefetchQuery as jest.Mock).mock.calls[0][0].queryFn;
        const sitesCall = (queryClient.prefetchQuery as jest.Mock).mock.calls[1][0].queryFn;
        const npcsCall = (queryClient.prefetchQuery as jest.Mock).mock.calls[2][0].queryFn;

        await settlementsCall();
        await sitesCall();
        await npcsCall();

        expect(settlementsSpy).toHaveBeenCalledWith(DefaultSettlementQueryParams);
        expect(sitesSpy).toHaveBeenCalledWith(DefaultSiteQueryParams);
        expect(npcsSpy).toHaveBeenCalledWith(DefaultNpcQueryParams);
    });
});
