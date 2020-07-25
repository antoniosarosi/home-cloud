const express = require('express');
const router = require('./routes/router');
const cors = require('cors');
const enoent = require('./middlewares/enoent');

const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', router);
app.use(enoent);

// Server
app.listen(port, () => console.log('Server running on port', port));
