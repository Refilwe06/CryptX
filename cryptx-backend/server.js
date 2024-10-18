require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: process.env.CLIENT_URL
}))

app.use(express.json());

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));