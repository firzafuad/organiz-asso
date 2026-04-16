const express = require("express");
const cors = require("cors");
const { getUsers } = require("./database");

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

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // Here you would normally check the username and password against a database
  if (username === "admin" && password === "password") {
    res.json({ success: true, message: "Login successful!" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
