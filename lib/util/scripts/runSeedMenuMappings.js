import { MongoClient } from "mongodb";
import { migrateMenuMappings } from "./seedMenuMappings.js";

async function main() {
  const uri = "mongodb+srv://brooke:CrUs4D3R@cluster0.y9ncd.mongodb.net/";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("realm_foundry");

    await migrateMenuMappings(db);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

main();
