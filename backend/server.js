const express = require("express");
const cors = require("cors");
const { getUsers, getUserByName, createUser } = require("./utils/database");

const app = express();

const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Basic route
app.get("/", (req, res) => {
  res.send("I'm Alive!");
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello World!" });
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

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserByName(username);
  if (user) {
    if (user.password === password) {
      res.json({ success: true, message: "Login successful!" });
    } else {
      res.status(401).json({ success: false, message: "Password incorrect" });
    }
  } else {
    res.status(401).json({ success: false, message: "User not found" });
  }
});

app.post("/register", async (req, res) => {
  const user = req.body;
  try {
    const existingUser = await getUserByName(user.name);
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Username already exists" });
    }
    await createUser(user);
    res.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
