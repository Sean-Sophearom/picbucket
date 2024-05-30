import mongoose from "mongoose";

type baseGlobal = typeof globalThis;
type MongooseConn = mongoose.Connection | typeof import("mongoose");

interface ExtendedGlobal extends baseGlobal {
  mongoose: {
    conn: MongooseConn | null;
    promise: Promise<MongooseConn> | null;
  };
}

const DATABASE_URL = process.env.MONGODB_URI as string;

if (!DATABASE_URL) {
  throw new Error("Please define the DATABASE_URL environment variable inside .env.local");
}

let cached = (global as ExtendedGlobal).mongoose;

if (!cached) {
  cached = (global as ExtendedGlobal).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
    //   bufferCommands: false,
    };

    cached.promise = mongoose.connect(DATABASE_URL, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
