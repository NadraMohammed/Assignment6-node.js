const { MongoClient } = require("mongodb");
require("dotenv").config();

const MONGO_URL = process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/assignment7";
const DB_NAME = process.env.DB_NAME || "assignment7";

let client;
let db;

const connectDB = async () => {
  try {
    client = new MongoClient(MONGO_URL);
    await client.connect();

    db = client.db(DB_NAME);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected yet. Call connectDB() first.");
  }
  return db;
};

module.exports = { connectDB, getDB };
