import { QueryClient } from "@tanstack/react-query";
import { invalidateConnections } from "@/lib/util/invalidateQuery";

describe("invalidateConnections", () => {
  let queryClient: QueryClient;

    beforeEach(() => {
        queryClient = new QueryClient();
        queryClient.invalidateQueries = jest.fn();
    });

    it("does nothing if connections array is empty or undefined", () => {
        expect(() => invalidateConnections(queryClient, [])).not.toThrow();
        expect(() => invalidateConnections(queryClient, undefined as any)).not.toThrow();
        expect(queryClient.invalidateQueries).not.toHaveBeenCalled();
    });

    it("invalidates NPC queries correctly", () => {
        const connections = [{ id: "npc1", type: "npc", role: "ally" }];
        invalidateConnections(queryClient, connections);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["npc", "npc1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedNpcs"] });
    });

    it("invalidates Settlement queries correctly", () => {
        const connections = [{ id: "settlement1", type: "settlement", role: "leader" }];
        invalidateConnections(queryClient, connections);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["settlement", "settlement1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedSettlements"] });
    });

    it("invalidates Site queries correctly", () => {
        const connections = [{ id: "site1", type: "site", role: "owner" }];
        invalidateConnections(queryClient, connections);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["site", "site1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedSites"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["sites"] });
    });

    it("handles multiple connections of mixed types", () => {
        const connections = [
            { id: "npc1", type: "npc", role: "ally" },
            { id: "settlement1", type: "settlement", role: "leader" },
            { id: "site1", type: "site", role: "owner" },
        ];
        invalidateConnections(queryClient, connections);
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["npc", "npc1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedNpcs"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["settlement", "settlement1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedSettlements"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["site", "site1"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["ownedSites"] });
        expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ["sites"] });
    });
});
