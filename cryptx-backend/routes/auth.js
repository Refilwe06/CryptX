const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// Register new user
router.post("/sign-up", (req, res) => {
    const { password, name, username } = req.body;

    // query db to check whether user exists
    db.query(`SELECT user_id FROM cryptx_users WHERE username = '${username}'`, (err, users) => {

        // send db error to my frontend if encountered
        if (err) return res.status(500).json({ err: err.message });

        // send conflict error to my frontend if user exists
        if (users.length) return res.status(409).send({ err: 'User already exists' });

        // insert query as new user if user does not exist in my db
        const sql = "INSERT INTO cryptx_users (name, username, password) VALUES (?)";

        // hash the user's password for security
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ err: "Error hashing password" });
            const values = [name, username, hash];

            db.query(sql, [values], (err, result) => {
                if (err) {
                    console.error(err.stack);
                    err.message = err.message.includes('Duplicate') ? 'Email already exists, please login' : err.message;
                    return res.status(400).json({ err: err.message });
                }

                // add new user to my db if no db error is returned
                const userQuery = "SELECT * FROM cryptx_users WHERE user_id = ?";

                // fetch the newly created user from my db
                db.query(userQuery, [result.insertId], (err, result) => {
                    if (err) {
                        console.error(err.stack);
                        return res.status(400).json({ err: err.message });
                    }
                    const user = result[0];
                    // sign user_id and create a json web token for authorization
                    const token = jwt.sign({ user_id: user.user_id }, process.env.jwt_SECRET, {
                        expiresIn: "1d",
                    });
                    delete user.password; // Don't send the password back to my frontend

                    return res.status(200).json({ msg: "Registration successful!", user, token });
                });
            });
        });
    });
});

//  Log existing user in
router.post("/sign-in", (req, res) => {
    const { username, password } = req.body;

    // fetch user from my db using the provided username
    const sql = "SELECT * FROM cryptx_users WHERE username = ?";

    db.query(sql, [username], (err, data) => {
        // return db error back to my frontend if it exists
        if (err) return res.status(500).json({ err: err.message });

        if (data.length > 0) {
            const [user] = data;
            // compare the hashed and provided passwords 
            bcrypt.compare(password, user.password, (err, passwordMatches) => {
                if (err) return res.status(400).json({ err: "Incorrect credentials" });
                if (passwordMatches) {
                    // sign the user_id and create a token for the logged in user
                    const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    delete user.password; // Don't send the password back for security

                    // send user object back to my frontend upon successful login
                    return res.status(200).json({ msg: "Login successful!", user, token });
                } else {
                    // send back error if the password provided did not match the hashed one
                    return res.status(400).json({ err: "Incorrect credentials" });
                }
            });
        } else {
            return res.status(400).json({ err: "Username not found" });
        }
    });
});

module.exports = router;
