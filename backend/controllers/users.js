const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db");

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

// function to get the current user
async function getCurrentUser(req, res) {
  try {
    const user = req.user;
    const result = await db.query(
      "SELECT name,email FROM users WHERE id = $1",
      [user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("No user found!");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// function to handle user logins
async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).send("Invalid email or password");
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid email or password");
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

// function to handle signup
async function handleUserSignup(req, res) {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Missing required fields");
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, hashedPassword]
    );

    res.status(201).send("User registered");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = { getCurrentUser, handleUserSignup, handleUserLogin };
