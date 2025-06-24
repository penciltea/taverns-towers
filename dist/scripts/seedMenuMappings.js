var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
export function migrateMenuMappings(db) {
    return __awaiter(this, void 0, void 0, function () {
        // Helper to update a mapping collection
        function updateMapping(collectionName, fieldName, value, itemId, siteType, shopType) {
            return __awaiter(this, void 0, void 0, function () {
                var query, update;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!value)
                                return [2 /*return*/];
                            query = (_a = {}, _a[fieldName] = value, _a);
                            update = {
                                $addToSet: {
                                    items: __assign({ itemId: itemId, siteType: siteType }, (shopType ? { shopType: shopType } : {})),
                                },
                            };
                            return [4 /*yield*/, db.collection(collectionName).updateOne(query, update, { upsert: true })];
                        case 1:
                            _b.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        var menuItems, mappingCollections, _i, menuItems_1, item, itemId, siteType, shopType, tags, terrain, climate, magic, _a, tags_1, tag, _b, terrain_1, t, _c, climate_1, c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, db.collection("GeneratorSiteMenu").find({}).toArray()];
                case 1:
                    menuItems = _d.sent();
                    mappingCollections = {
                        tag: "generator_site_menu_mapping_by_tag",
                        terrain: "generator_site_menu_mapping_by_terrain",
                        climate: "generator_site_menu_mapping_by_climate",
                        magic: "generator_site_menu_mapping_by_magic"
                    };
                    _i = 0, menuItems_1 = menuItems;
                    _d.label = 2;
                case 2:
                    if (!(_i < menuItems_1.length)) return [3 /*break*/, 17];
                    item = menuItems_1[_i];
                    itemId = item._id, siteType = item.siteType, shopType = item.shopType, tags = item.tags, terrain = item.terrain, climate = item.climate, magic = item.magic;
                    if (!Array.isArray(tags)) return [3 /*break*/, 6];
                    _a = 0, tags_1 = tags;
                    _d.label = 3;
                case 3:
                    if (!(_a < tags_1.length)) return [3 /*break*/, 6];
                    tag = tags_1[_a];
                    return [4 /*yield*/, updateMapping(mappingCollections.tag, "tag", tag, itemId, siteType, shopType)];
                case 4:
                    _d.sent();
                    _d.label = 5;
                case 5:
                    _a++;
                    return [3 /*break*/, 3];
                case 6:
                    if (!Array.isArray(terrain)) return [3 /*break*/, 10];
                    _b = 0, terrain_1 = terrain;
                    _d.label = 7;
                case 7:
                    if (!(_b < terrain_1.length)) return [3 /*break*/, 10];
                    t = terrain_1[_b];
                    return [4 /*yield*/, updateMapping(mappingCollections.terrain, "terrain", t, itemId, siteType, shopType)];
                case 8:
                    _d.sent();
                    _d.label = 9;
                case 9:
                    _b++;
                    return [3 /*break*/, 7];
                case 10:
                    if (!Array.isArray(climate)) return [3 /*break*/, 14];
                    _c = 0, climate_1 = climate;
                    _d.label = 11;
                case 11:
                    if (!(_c < climate_1.length)) return [3 /*break*/, 14];
                    c = climate_1[_c];
                    return [4 /*yield*/, updateMapping(mappingCollections.climate, "climate", c, itemId, siteType, shopType)];
                case 12:
                    _d.sent();
                    _d.label = 13;
                case 13:
                    _c++;
                    return [3 /*break*/, 11];
                case 14:
                    if (!(typeof magic === "string" && magic.trim() !== "")) return [3 /*break*/, 16];
                    return [4 /*yield*/, updateMapping(mappingCollections.magic, "magic", magic, itemId, siteType, shopType)];
                case 15:
                    _d.sent();
                    _d.label = 16;
                case 16:
                    _i++;
                    return [3 /*break*/, 2];
                case 17:
                    console.log("✅ Menu item mappings updated.");
                    return [2 /*return*/];
            }
        });
    });
}
