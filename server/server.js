const express = require('express');   
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const insertvehicleroutes = require('./routes/insertvehicleroutes');

mongoose.connect(process.env.MONGO_URL)
    .then((conn) => {
        console.log('MongoDB connected successfully on port', conn.connection.port);
    })
    .catch((err) => {
        console.log('MongoDB connection failed', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the Vehicle Rental API');
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', insertvehicleroutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});