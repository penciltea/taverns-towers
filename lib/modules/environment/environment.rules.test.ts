import { TagsByTerrain } from '@/lib/models/generator/settlement/tagsByTerrain.model';
import { normalizeEnvironmentInput, applyTerrainBlacklistRule, applyClimateRule, applyTagsByTerrainRule, removeRandomMarkers } from './environment.rules';
import { TerrainBlacklist } from '@/lib/models/generator/settlement/terrainBlacklists.model';

jest.mock('@/lib/models/generator/settlement/terrainBlacklists.model', () => ({
  TerrainBlacklist: {
    findOne: jest.fn(),
  },
}));

jest.mock('@/lib/models/generator/settlement/tagsByTerrain.model', () => ({
  TagsByTerrain: {
    findOne: jest.fn(),
  },
}));


describe('normalizeEnvironmentInput', () => {
    it('substitutes "random" when values are missing or empty', () => {
        const result = normalizeEnvironmentInput({});
        expect(result).toEqual({
        climate: 'random',
        terrain: ['random'],
        tags: ['random'],
        });
    });

    it('preserves provided values', () => {
        const result = normalizeEnvironmentInput({
        climate: 'Polar',
        terrain: ['Forest'],
        tags: ['Trade Hub'],
        });
        expect(result).toEqual({
        climate: 'Polar',
        terrain: ['Forest'],
        tags: ['Trade Hub'],
        });
    });
});


describe('applyClimateRule', () => {
    it('replaces "random" climate with a valid climate', () => {
        const input = { climate: 'random', terrain: ['Forest'], tags: ['Trade Hub'] };
        const result = applyClimateRule(input);
        expect(result.climate).not.toBe('random');
        expect(result.climate).toBeDefined();
    });

    it('preserves specified climate', () => {
        const input = { climate: 'Tropical', terrain: ['Forest'], tags: ['Trade Hub'] };
        const result = applyClimateRule(input);
        expect(result.climate).toBe('Tropical');
    });

});


describe('applyTerrainBlacklistRule', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default behavior for all tests unless overridden
        (TerrainBlacklist.findOne as jest.Mock).mockResolvedValue({
            lean: jest.fn().mockResolvedValue({
                blacklistedTerrains: ['Swamp'],
            }),
        });
    });

    it('replaces "random" terrain with valid terrains based on climate', async () => {
        const input = { climate: 'Dry', terrain: ['random', 'Mountain'], tags: ['random'] };
        const result = await applyTerrainBlacklistRule(input);

        expect(result.terrain).toContain('Mountain');
        expect(result.terrain).not.toContain('Swamp');
    });

    it('returns input unchanged if no "random" terrain', async () => {
        const input = { climate: 'Temperate', terrain: ['Hills'], tags: ['random'] };
        const result = await applyTerrainBlacklistRule(input);
        expect(result).toEqual(input);
    });

    it('falls back to local mapping if database lookup fails', async () => {
        // Override default behavior just for this test
        (TerrainBlacklist.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB error')),
        });

        const input = { climate: 'NonExistentClimate', terrain: ['random'], tags: ['random'] };
        const result = await applyTerrainBlacklistRule(input);

        expect(result.terrain).not.toContain('random');
        expect(result.terrain.length).toBe(1);
    });
});

describe('applyTagsbyTerrainRule', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Default behavior for all tests unless overridden
        (TagsByTerrain.findOne as jest.Mock).mockResolvedValue({
            lean: jest.fn().mockResolvedValue({
                tags: ['Agricultural', 'Fishing'],
            }),
        });
    });

    it('replaces "random" tags with derived tags based on terrain', async () => {
        const input = { climate: 'Temperate', terrain: ['Forest', 'River'], tags: ['random'] };
        const result = await applyTagsByTerrainRule(input);
        expect(result.tags).not.toContain('random');
        expect(result.tags.length).toBeGreaterThan(0);
    });

    it('returns input unchanged if no "random" tags', async () => {
        const input = { climate: 'Temperate', terrain: ['Hills'], tags: ['Trade Hub'] };
        const result = await applyTagsByTerrainRule(input);
        expect(result).toEqual(input);
    });

    it('falls back to local mapping if database lookup fails', async () => {
        // Override default behavior just for this test
        (TagsByTerrain.findOne as jest.Mock).mockReturnValue({
            lean: jest.fn().mockRejectedValue(new Error('DB error')),
        }); 
        const input = { climate: 'Temperate', terrain: ['Forest'], tags: ['random'] };
        const result = await applyTagsByTerrainRule(input);
        expect(result.tags).not.toContain('random');
        expect(result.tags.length).toBeGreaterThan(0);
    });
});

describe('removeRandomMarkers', () => {
    it('removes "random" from tags and terrain', async () => {
        const input = { climate: 'Temperate', terrain: ['random', 'Forest'], tags: ['random', 'Trade Hub'] };
        const result = await removeRandomMarkers(input);
        expect(result.terrain).not.toContain('random');
        expect(result.tags).not.toContain('random');
        expect(result.terrain.length).toBe(1);
        expect(result.tags.length).toBe(1);
    });

    it('returns input unchanged if no "random" markers', async () => {
        const input = { climate: 'Temperate', terrain: ['Forest'], tags: ['Trade Hub'] };
        const result = await removeRandomMarkers(input);
        expect(result).toEqual(input);
    });
});