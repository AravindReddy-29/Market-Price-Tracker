const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 5000;

// ================= DATABASE CONNECTION =================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",   // your mysql password
    database: "agri_tracker"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err);
    } else {
        console.log("✅ Connected to MySQL Database");
    }
});

// ================= USERS =================

// SIGNUP
app.post("/api/signup", (req, res) => {

    console.log("📩 Signup request received:", req.body);

    const { name, email, password } = req.body;

    // Validate empty fields
    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], (err, results) => {

        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }

        if (results.length > 0) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Insert new user
        const insertQuery = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
        db.query(insertQuery, [name, email, password], (err) => {

            if (err) {
                console.error("Insert error:", err);
                return res.status(500).json({ error: "Signup failed" });
            }

            console.log("✅ User created successfully");
            res.json({ message: "Signup successful" });
        });

    });
});


// LOGIN
app.post("/api/login", (req, res) => {

    console.log("🔐 Login request:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    const query = "SELECT * FROM users WHERE email = ? AND password = ?";
    db.query(query, [email, password], (err, results) => {

        if (err) {
            console.error("Login error:", err);
            return res.status(500).json({ error: "Login failed" });
        }

        if (results.length > 0) {
            res.json({ message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

// ================= PRICES =================

app.get("/api/prices", (req, res) => {

    const { commodity, market } = req.query;

    let query = `
        SELECT crops.crop_name AS commodity,
               markets.market_name AS market,
               prices.arrival_date,
               prices.modal_price
        FROM prices
        JOIN crops ON prices.crop_id = crops.crop_id
        JOIN markets ON prices.market_id = markets.market_id
        WHERE 1=1
    `;

    const params = [];

    if (commodity) {
        query += " AND crops.crop_name = ?";
        params.push(commodity);
    }

    if (market) {
        query += " AND markets.market_name = ?";
        params.push(market);
    }

    query += " ORDER BY prices.arrival_date ASC";

    db.query(query, params, (err, results) => {

        if (err) {
            console.error("Price query error:", err);
            return res.status(500).json({ error: "Query failed" });
        }

        const formatted = results.map(row => ({
            ...row,
            arrival_date: row.arrival_date.toISOString().split("T")[0]
        }));

        res.json(formatted);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});