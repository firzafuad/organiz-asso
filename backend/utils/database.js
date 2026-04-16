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

exports.getUsers = getUsers;
exports.getUserByName = getUserByName;
exports.createUser = createUser;