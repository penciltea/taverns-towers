import { SiteFormData } from "@/schemas/site.schema";
import { applySecrecyByConditions, applyKnownTo, applyDefenses, applyPurpose, isHiddenSite } from "@/lib/modules/site/hidden/hidden.rules";
import { SECRECY_LEVELS, KNOWN_TO, DEFENSE, PURPOSE } from "@/constants/site/hidden.options";
import { HiddenSite } from "@/interfaces/site.interface";

describe("Hidden Site Generation Rules", () => {
  let baseSite: Partial<SiteFormData>;

  beforeEach(() => {
    baseSite = {
      type: "hidden",
      size: "modest",
      condition: "average",
      secrecy: ["random"],
      knownTo: ["random"],
      defenses: ["random"],
      purpose: ["random"],
    };
  });

  test("isHiddenSite returns true for hidden type", () => {
    expect(isHiddenSite({ type: "hidden" })).toBe(true);
    expect(isHiddenSite({ type: "tavern" })).toBe(false);
  });

  describe("applySecrecyByConditions", () => {
    it("replaces secrecy if empty or 'random'", async () => {
      const site = await applySecrecyByConditions(baseSite) as Partial<HiddenSite>;
      expect(site.secrecy).toBeDefined();
      expect(Array.isArray(site.secrecy)).toBe(true);
      site.secrecy?.forEach((s) =>
        expect(SECRECY_LEVELS.map((v) => v.value)).toContain(s)
      );
    });

    it("does not overwrite existing secrecy", async () => {
      const customSite = { ...baseSite, secrecy: ["guarded"] };
      const site = await applySecrecyByConditions(customSite) as Partial<HiddenSite>;
      expect(site.secrecy).toEqual(["guarded"]);
    });
  });

  describe("applyKnownTo", () => {
    it("replaces knownTo if empty or 'random'", async () => {
      const site = await applyKnownTo(baseSite) as Partial<HiddenSite>;
      expect(site.knownTo).toBeDefined();
      expect(Array.isArray(site.knownTo)).toBe(true);
      site.knownTo?.forEach((k) =>
        expect(KNOWN_TO.map((v) => v.value)).toContain(k)
      );
    });
  });

  describe("applyDefenses", () => {
    it("replaces defenses if empty or 'random'", async () => {
      const site = await applyDefenses(baseSite) as Partial<HiddenSite>;
      expect(site.defenses).toBeDefined();
      expect(Array.isArray(site.defenses)).toBe(true);
      site.defenses?.forEach((d) =>
        expect(DEFENSE.map((v) => v.value)).toContain(d)
      );
    });
  });

  describe("applyPurpose", () => {
    it("replaces purpose if empty or 'random'", async () => {
      const site = await applyPurpose(baseSite) as Partial<HiddenSite>;
      expect(site.purpose).toBeDefined();
      expect(Array.isArray(site.purpose)).toBe(true);
      site.purpose?.forEach((p) =>
        expect(PURPOSE.map((v) => v.value)).toContain(p)
      );
    });
  });

  describe("field influences", () => {
    it("high secrecy reduces number of knownTo", async () => {
      const siteWithHighSecrecy: Partial<SiteFormData> = {
        ...baseSite,
        secrecy: ["magically_hidden"],
        knownTo: ["random"],
      };
      const site = await applyKnownTo(siteWithHighSecrecy) as Partial<HiddenSite>;
      expect(site.knownTo?.length).toBeLessThanOrEqual(2);
    });

    it("criminal purpose prefers thieves or locals", async () => {
      const siteWithCriminal: Partial<SiteFormData> = {
        ...baseSite,
        purpose: ["criminal"],
        knownTo: ["random"],
      };
      const site = await applyKnownTo(siteWithCriminal) as Partial<HiddenSite>;
      site.knownTo?.forEach((k) =>
        expect(["thievesGuild", "locals"]).toContain(k)
      );
    });
  });
});
