const mongodb = require("mongodb");
const dotenv = require("dotenv");

dotenv.config();
MONGO_URI = process.env.MONGO_URI;
const { MongoClient } = mongodb;

async function getUsers() {
  const client = await MongoClient.connect(MONGO_URI);
  const collection = client.db('Forum').collection('Users');
  const users = await collection.find({}).toArray();
  await client.close();
  return users;
}

exports.getUsers = getUsers;