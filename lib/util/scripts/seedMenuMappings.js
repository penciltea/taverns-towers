/**
 * @param {import('mongodb').Db} db
 */

export async function migrateMenuMappings(db) {
  const menuItems = await db.collection("generator_site_menus").find({}).toArray();

  const mappingCollections = {
    tag: "generator_site_menu_mapping_by_tag",
    terrain: "generator_site_menu_mapping_by_terrain",
    climate: "generator_site_menu_mapping_by_climate",
    magic: "generator_site_menu_mapping_by_magic"
  };

  // Helper to update a mapping collection
  async function updateMapping(collectionName, fieldName, value, itemId, siteType, shopType) {
    if (!value) return;

    const query = { [fieldName]: value };
    const update = {
      $addToSet: {
        items: {
          itemId,
          siteType,
          ...(shopType ? { shopType } : {}),
        },
      },
    };

    await db.collection(collectionName).updateOne(query, update, { upsert: true });
  }

  for (const item of menuItems) {
    const { _id: itemId, siteType, shopType, tags, terrain, climate, magic } = item;

    if (Array.isArray(tags)) {
      for (const tag of tags) {
        await updateMapping(mappingCollections.tag, "tag", tag, itemId, siteType, shopType);
      }
    }

    if (Array.isArray(terrain)) {
      for (const t of terrain) {
        await updateMapping(mappingCollections.terrain, "terrain", t, itemId, siteType, shopType);
      }
    }

    if (Array.isArray(climate)) {
      for (const c of climate) {
        await updateMapping(mappingCollections.climate, "climate", c, itemId, siteType, shopType);
      }
    }

    if (typeof magic === "string" && magic.trim() !== "") {
      await updateMapping(mappingCollections.magic, "magic", magic, itemId, siteType, shopType);
    }
  }

  console.log("✅ Menu item mappings updated.");
}

