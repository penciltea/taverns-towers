import { MongoClient } from "mongodb";

const uri = process.env.API_URL!;
const options = {};

if (!uri) {
  throw new Error("Please define the API_URL environment variable inside .env.local");
}

// Singleton pattern: module-scoped variable
let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
