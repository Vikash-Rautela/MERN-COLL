const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnect = require('./config/db').dbConnect;

dbConnect();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.use(cors());

app.use('/', require('./routes'));

app.listen(PORT, (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
        console.log(`App is running at port ${PORT}`);
    }
});
