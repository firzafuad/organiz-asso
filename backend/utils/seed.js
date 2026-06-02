const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");
require("dotenv").config();

// ─── SEED DATA ────────────────────────────────────────────────────────────────

const USERS = [
    {
    username: "firzafuad",
    firstName: "Firza",
    lastName: "Fuadi",
    email: "fuad@forum.fr",
    password: "123456",
    role: "admin"
  },
  {
    username: "maitreweb",
    firstName: "Gilles",
    lastName: "Chagnon",
    email: "gilles@forum.fr",
    password: "password123",
    role: "admin"
  },
  {
    username: "admin_alice",
    firstName: "Alice",
    lastName: "Martin",
    email: "alice@forum.fr",
    password: "password123",
    role: "admin"
  },
  {
    username: "bob_membre",
    firstName: "Bob",
    lastName: "Dupont",
    email: "bob@forum.fr",
    password: "password123",
    role: "member"
  },
  {
    username: "claire42",
    firstName: "Claire",
    lastName: "Bernard",
    email: "claire@forum.fr",
    password: "password123",
    role: "member"
  },
  {
    username: "david_pending",
    firstName: "David",
    lastName: "Leroy",
    email: "david@forum.fr",
    password: "password123",
    role: "pending"
  }
];

// Messages use "replyTo" to reference the parent by index in this array.
// parentId: null = top-level message
// replyTo: 0    = reply to MESSAGES[0]
const MESSAGES = [
  // ── public thread ──
  {
    author: "bob_membre",
    text: "Bonjour à tous ! Quelqu'un sait quand aura lieu la prochaine réunion de l'association ?",
    category: "public",
    createdAt: "2024-01-30T13:00:00",
    replyTo: null
  },
  {
    author: "admin_alice",
    text: "La prochaine réunion est prévue pour le 15 février à 18h. Je vous enverrai un rappel la semaine prochaine.",
    category: "public",
    createdAt: "2024-01-30T13:15:00",
    replyTo: 0   // reply to message index 0
  },
  {
    author: "claire42",
    text: "Merci Alice ! Est-ce qu'on peut proposer des points à l'ordre du jour ?",
    category: "public",
    createdAt: "2024-01-30T13:30:00",
    replyTo: 0
  },
  {
    author: "admin_alice",
    text: "Bien sûr Claire, envoyez vos propositions par email avant le 10 février.",
    category: "public",
    createdAt: "2024-01-30T13:45:00",
    replyTo: 2   // reply to claire's message (index 2)
  },

  // ── another public thread ──
  {
    author: "claire42",
    text: "Je cherche des bénévoles pour organiser la fête de printemps. Qui est disponible en avril ?",
    category: "public",
    createdAt: "2024-02-01T10:00:00",
    replyTo: null
  },
  {
    author: "bob_membre",
    text: "Je suis dispo le week-end du 20 avril !",
    category: "public",
    createdAt: "2024-02-01T10:30:00",
    replyTo: 4
  },

  // ── private (admin) thread ──
  {
    author: "admin_alice",
    text: "Rappel aux administrateurs : le rapport annuel doit être finalisé avant le 28 février.",
    category: "private",
    createdAt: "2024-02-05T09:00:00",
    replyTo: null
  },
  {
    author: "admin_alice",
    text: "J'ai mis à jour le modèle de rapport dans le dossier partagé.",
    category: "private",
    createdAt: "2024-02-05T09:20:00",
    replyTo: 6
  }
];

// ─── SEED SCRIPT ──────────────────────────────────────────────────────────────

async function seed() {
  const client = new MongoClient(process.env.MONGO_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME || "AFF_CRDA");

    // 1. Clear collections
    await db.collection("Users").deleteMany({});
    await db.collection("Messages").deleteMany({});
    console.log("Cleared Users and Messages");

    // 2. Insert users with hashed passwords
    const hashedUsers = await Promise.all(
      USERS.map(async (u) => ({
        ...u,
        password: await bcrypt.hash(u.password, 10),
        createdAt: new Date()
      }))
    );
    const insertedUsers = await db.collection("Users").insertMany(hashedUsers);
    console.log(`Inserted ${insertedUsers.insertedCount} users`);

    // Build username -> userId map
    const userMap = {};
    USERS.forEach((u, i) => {
      userMap[u.username] = insertedUsers.insertedIds[i].toString();
    });

    // 3. Insert messages in order, tracking inserted _ids for parentId linking
    const insertedIds = [];

    for (const msg of MESSAGES) {
      const doc = {
        author: msg.author,
        text: msg.text,
        category: msg.category,
        userId: userMap[msg.author],
        parentId: msg.replyTo !== null ? insertedIds[msg.replyTo].toString() : null,
        createdAt: new Date(msg.createdAt)
      };

      const result = await db.collection("Messages").insertOne(doc);
      insertedIds.push(result.insertedId);
    }

    console.log(`Inserted ${MESSAGES.length} messages`);
    console.log("\nDone! Credentials for all users: password123");

  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});