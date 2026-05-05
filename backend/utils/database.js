const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "Forum";
if (!MONGO_URI) {
  throw new Error("MONGO_URI is required");
}

const client = new MongoClient(MONGO_URI);
let db = null;

async function connectToDB() {
  if (!db) {
    await client.connect();
    db = client.db(DB_NAME);

    await db.collection("Users").createIndex({ email: 1 }, { unique: true });
    await db.collection("Messages").createIndex({ userId: 1, createdAt: -1 });

    console.log("MongoDB connected");
  }

  return db;
}

async function closeDBConnection() {
  if (client) {
    await client.close();
    db = null;
    console.log("MongoDB connection closed");
  }
}

function sanitizeUser(user) {
  return {
    id: user._id.toString(),
    email: user.email
  };
}

async function getUsers() {
  const client = await MongoClient.connect(MONGO_URI);
  const collection = client.db('Forum').collection('Users');
  const users = await collection.find({}).toArray();
  await client.close();
  return users;
}

async function getUserByName(username) {
  const client = await MongoClient.connect(MONGO_URI);
  const collection = client.db('Forum').collection('Users');
  const user = await collection.findOne({ name: username });
  await client.close();
  return user;
}

async function createUser(user) {
  const client = await MongoClient.connect(MONGO_URI);
  const collection = client.db('Forum').collection('Users');
  const result = await collection.insertOne(user);
  await client.close();
  return result;
}

exports.connectToDB = connectToDB;
exports.getUsers = getUsers;
exports.getUserByName = getUserByName;
exports.createUser = createUser;
exports.closeDBConnection = closeDBConnection;