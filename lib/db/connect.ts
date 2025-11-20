'use server';

import mongoose from 'mongoose';
import { AppError } from '../errors/app-error';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new AppError('Please define the MONGODB_URI environment variable inside .env.local', 500);
}

let cachedConn: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

export const connectToDatabase = async (): Promise<typeof mongoose> => {
  if (cachedConn) {
    return cachedConn;
  }

  if (!cachedPromise) {
    const opts = { bufferCommands: false };
    cachedPromise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      cachedConn = m;
      return m;
    });
  }

  return cachedPromise;
};

export default connectToDatabase;
