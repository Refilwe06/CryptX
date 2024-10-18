require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;
const auth = require('./routes/auth');
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
}))

app.use(express.json());
app.use('/auth', auth);

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));