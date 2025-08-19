const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();


app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));



mongoose.connect(process.env.MONGO_URL || "mongodb://localhost:27017/ToDo" )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));


app.use('/api/auth', userRoutes);
app.use('/api/task', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));