require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// health check 
app.get("/", (req, res) => {
    res.send("The server is Running...");
});

/*
   get universities filter
   - country
   - degree
   - tuition range
*/
app.get("/api/universities", async (req, res) => {
    try {
        const {
            country,
            degree,
            minFee = 0,
            maxFee = 100000,
        } = req.query;

        let query = "SELECT * FROM universities WHERE 1=1";
        let values = [];

        if (country) {
            values.push(country);
            query += ` AND country = $${values.length}`;
        }

        if (degree) {
            values.push(degree);
            query += ` AND degree_level = $${values.length}`;
        }

        values.push(minFee, maxFee);
        query += ` AND tuition_fee BETWEEN $${values.length - 1} AND $${values.length}`;

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

/* APPLY TO UNIVERSITY - backend validation */
app.post("/api/applications", async (req, res) => {
    try {
        const {
            universityId,
            name,
            email,
            gpa,
            ielts,
        } = req.body;

        //Get university requirements
        const uniResult = await pool.query(
            "SELECT min_gpa, min_ielts FROM universities WHERE id = $1",
            [universityId]
        );

        if (uniResult.rows.length === 0) {
            return res.status(404).json({ message: "University not found" });
        }

        const { min_gpa, min_ielts } = uniResult.rows[0];

        //Validate eligibility
        if (gpa < min_gpa || ielts < min_ielts) {
            return res.status(400).json({
                message: "Not eligible based on GPA or IELTS",
            });
        }

        // Save application
        await pool.query(
            `INSERT INTO applications (university_id, name, email, gpa, ielts)
             VALUES ($1, $2, $3, $4, $5)`,
            [universityId, name, email, gpa, ielts]
        );

        res.json({ message: "Application submitted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
