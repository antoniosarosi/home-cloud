const express = require('express');
const cors = require('cors');
const contentRouter = require('./routes/content');
const uploadRouter = require('./routes/upload');
const dirRouter = require('./routes/dir');
const enoent = require('./middlewares/enoent');

const port = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => res.send('Home cloud API'));
app.use('/content', contentRouter);
app.use('/upload', uploadRouter);
app.use('/dir', dirRouter);
app.use(enoent);

// Server
app.listen(port, () => console.log('Server running on port', port));
