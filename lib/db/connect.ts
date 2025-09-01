import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
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
    cachedPromise = mongoose.connect(MONGODB_URI, opts);
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