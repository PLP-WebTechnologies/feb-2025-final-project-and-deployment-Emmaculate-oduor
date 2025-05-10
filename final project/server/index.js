const express = require("express");
const cors = require("cors");
const db = require("./db");
const path = require("path");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow frontend requests
app.use(express.static(path.join(__dirname, "../public"))); // Serve static files (HTML, CSS, JS)

// API Route: Save contact form submissions
app.post("/api/contact", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        console.log("Received data:", req.body);

        const [result] = await db.execute("INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)", 
            [name, email, message]);

        console.log("Database Insert Result:", result); 

        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).json({ error: "Database error" });
    }
});

db.getConnection()
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));

  
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
