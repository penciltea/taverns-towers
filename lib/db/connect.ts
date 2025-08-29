import mongoose from 'mongoose';

const API_URL = process.env.API_URL;

if (!API_URL) {
  throw new Error(
    'Please define the API_URL environment variable inside .env.local'
  );
}

// Module-level cache
let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    const opts = { bufferCommands: false };
    cachedPromise = mongoose.connect(API_URL, opts);
  }

  try {
    cachedConn = await cachedPromise;
    return cachedConn;
  } catch (error) {
    cachedPromise = null;
    throw error;
  }
};

export default connectToDatabase;