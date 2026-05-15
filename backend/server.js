const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bcrypt = require("bcrypt");
const { MongoStore } = require("connect-mongo");
const { ObjectId } = require("mongodb")
const { connectToDB, getUsers, getUserByName, createUser, sanitizeUser, sanitizeMessage } = require("./utils/database");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
const SESSION_SECRET = process.env.SESSION_SECRET || "dev_secret";
const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = process.env.DB_NAME || "Forum";


function authMiddleware(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "authentication required" });
  }

  next();
}

// Middleware to parse JSON
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());

app.use(
  session({
    name: "sid",
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: MONGO_URI,
      dbName: DB_NAME,
      collectionName: "sessions"
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24
    }
  })
);

// Basic route
app.get("/", (req, res) => {
  res.send("I'm Alive!");
});

app.get("/auth/me", async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ error: "not authenticated" });
    }

    const database = await connectToDB();
    const user = await database.collection("Users").findOne({
      _id: new ObjectId(req.session.userId)
    });

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ error: "user not found" });
    }

    res.json({ user: sanitizeUser(user) });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.post("/auth/signup", async (req, res) => {
  try {
    const { username, firstName, lastName, email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "password must be at least 6 characters long" });
    }

    const database = await connectToDB();

    const existingEmail = await database.collection("Users").findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ error: "email already in use" });
    }

    const existingUser = await database.collection("Users").findOne({ username });

    if (existingUser) {
      return res.status(409).json({ error: "username already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await database.collection("Users").insertOne({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    req.session.userId = result.insertedId.toString();

    res.status(201).json({
      message: "signup successful",
      user: {
        id: result.insertedId.toString(),
        username,
        name: `${user.firstName} ${user.lastName}`,
        email
      }
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.post("/auth/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "email and password are required" });
    }

    const database = await connectToDB();

    const user = await database.collection("Users").findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    req.session.userId = user._id.toString();

    res.json({
      message: "signin successful",
      user: sanitizeUser(user)
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
    console.log("Error: ", error)
  }
});

app.post("/auth/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ error: "logout failed" });
    }

    res.clearCookie("sid", {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    });

    res.json({ message: "logout successful" });
  });
});

app.get("/messages", authMiddleware, async (req, res) => {
  try {
    const database = await connectToDB();

    const messages = await database
      .collection("Messages")
      .find({ userId: req.session.userId })
      .sort({ createdAt: -1 })
      .toArray();

    res.json({
      messages: messages.map((msg) => sanitizeMessage(msg))
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.post("/messages", authMiddleware, async (req, res) => {
  try {
    const { author, text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "text is required" });
    }

    const database = await connectToDB();

    const result = await database.collection("Messages").insertOne({
      text: text.trim(),
      author: author,
      userId: req.session.userId,
      createdAt: new Date()
    });

    const message = await database
      .collection("Messages")
      .findOne({ _id: new ObjectId(result.insertedId) });

    res.status(201).json({
      message: sanitizeMessage(message)
    });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Start server
connectToDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
  });
