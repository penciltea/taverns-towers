import { MongoClient } from "mongodb";
import { AppError } from "../errors/app-error";

const uri = process.env.MONGODB_URI!;
const options = {};

if (!uri) {
  throw new AppError("Please define the MONGODB_URI environment variable inside .env.local", 500);
}

// Singleton pattern: module-scoped variable
let client: MongoClient | undefined;
let clientPromise: Promise<MongoClient> | undefined;

if (!clientPromise) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
