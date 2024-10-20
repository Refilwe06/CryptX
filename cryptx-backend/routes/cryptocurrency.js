const router = require("express").Router();
const db = require("../db");

// Register new user
router.get("/get-transactions", (req, res) => {
    // fetch user from my db using the provided username
    const sql = "SELECT * FROM cryptx_transactions";

    db.query(sql, (err, data) => {
        // return db error back to my frontend if it exists
        if (err) return res.status(500).json({ err: err.message });

        if (data.length > 0) {
            if (err) return res.status(400).json({ err: "Error fetching transactions" });

            // send transactions back to my frontend
            return res.status(200).json({ transactions: data });
        } else {
            return res.status(400).json({ err: "Error fetching transactions" });
        }
    });
});

module.exports = router;
