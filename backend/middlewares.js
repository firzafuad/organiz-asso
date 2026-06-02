const { connectToDB } = require("./utils/database");
const { ObjectId } = require("mongodb");

async function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "not authenticated" });
  }
  next();
}

async function adminMiddleware(req, res, next) {
  try {
    const db = await connectToDB();

    const user = await db.collection("Users").findOne({
      _id: new ObjectId(req.session.userId)
    });

    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "admin only" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
}

module.exports = {
  authMiddleware,
  adminMiddleware
};