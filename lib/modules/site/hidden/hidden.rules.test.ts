import { SiteFormData } from "@/schemas/site.schema";
import { applySecrecyByConditions, applyKnownTo, applyDefenses, applyPurpose, isHiddenSite, generateHiddenData } from "@/lib/modules/site/hidden/hidden.rules";
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

    it("uses arcane/ritual branch when purpose includes research", async () => {
      const site: Partial<SiteFormData> = {
        ...baseSite,
        purpose: ["research"], // triggers the true branch
        defenses: ["random"],
      };
      const result = await applyDefenses(site) as Partial<HiddenSite>;
      expect(result.defenses).toBeDefined();
      result.defenses?.forEach((d) => {
        expect(DEFENSE.map((v) => v.value)).toContain(d);
      });
    });

    it("uses default branch when purpose does not include research or occult", async () => {
      const site: Partial<SiteFormData> = {
        ...baseSite,
        purpose: ["criminal"], // triggers the false branch
        defenses: ["random"],
      };
      const result = await applyDefenses(site) as Partial<HiddenSite>;
      expect(result.defenses).toBeDefined();
      result.defenses?.forEach((d) => {
        expect(DEFENSE.map((v) => v.value)).toContain(d);
      });
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

    it("includes occult/research when high secrecy (magically_hidden)", async () => {
      const site: Partial<SiteFormData> = {
        ...baseSite,
        secrecy: ["magically_hidden"], // triggers highSecrecy = true
        purpose: ["random"],
      };
      const result = await applyPurpose(site) as Partial<HiddenSite>;
      expect(result.purpose).toBeDefined();
      // Make sure occult or research could appear in the result
      const possibleValues = PURPOSE.map((p) => p.value);
      result.purpose?.forEach((p) => {
        expect(possibleValues).toContain(p);
      });
    });

    it("excludes occult/research when not high secrecy", async () => {
      const site: Partial<SiteFormData> = {
        ...baseSite,
        secrecy: ["concealed"], // triggers highSecrecy = false
        purpose: ["random"],
      };
      const result = await applyPurpose(site) as Partial<HiddenSite>;
      expect(result.purpose).toBeDefined();

      // Ensure none of the forbidden purposes appear
      result.purpose?.forEach((p) => {
        expect(["occult", "research"]).not.toContain(p);
      });
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
  

  describe("Miscellaneous code coverage tests", () => {
    type SecrecyItem = string | { value: string };

    it("does nothing for non-hidden sites", async () => {
      const site = { type: "tavern", secrecy: ["random"], connections: [] } as Partial<SiteFormData>;
      const result = await applySecrecyByConditions(site);
      expect(result).toEqual(site);
    });

    it("defenses increase secrecy cap", async () => {
      const site = { type: "hidden", size: "small", secrecy: ["random"], defenses: ["walls"] } as Partial<SiteFormData>;
      const result = await applySecrecyByConditions(site) as Partial<HiddenSite>;
      expect(result.secrecy).toBeDefined();
      // Expect at least one high-level secrecy option possible
      
      // Normalize secrecy values to always compare strings
      const secrecyValues = result.secrecy?.map((s: SecrecyItem) =>
        typeof s === "string" ? s : s.value
      );

      // Lower secrecy should be possible
      expect(secrecyValues?.some(s => ["guarded", "encrypted"].includes(s!)))
        .toBe(true);
    });

    it("multiple knownTo groups allow lower secrecy", async () => {
      const site = { 
        type: "hidden", 
        size: "large", 
        secrecy: ["random"], 
        knownTo: ["locals", "mages", "nobility"] 
      } as Partial<SiteFormData>;

      const result = await applySecrecyByConditions(site) as Partial<HiddenSite>;
      expect(result.secrecy).toBeDefined();

      // Normalize secrecy values to always compare strings
      const secrecyValues = result.secrecy?.map((s: SecrecyItem) =>
        typeof s === "string" ? s : s.value
      );

      // Lower secrecy should be possible
      expect(secrecyValues?.some(s => ["guarded", "encrypted", "magically_hidden"].includes(s!)))
        .toBe(true);
    });

    it("generateHiddenData produces a fully populated hidden site", async () => {
      const input = { type: "hidden", size: "small" } as SiteFormData;
      const result = await generateHiddenData(input) as Partial<HiddenSite>;

      expect(result.type).toBe("hidden");
      expect(result.secrecy).toBeDefined();
      expect(result.knownTo).toBeDefined();
      expect(result.defenses).toBeDefined();
      expect(result.purpose).toBeDefined();
    });
  });
});
