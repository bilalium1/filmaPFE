import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; // Add this line at the top

const app = express();

// pour accepter JSON dans le DB 
app.use(express.json())

// Initializer le serveur dans le port 1111
app.listen(1111, () => {
    console.log('Server is running on port 1111');
});

app.get('/', (req, res) => {
    res.send("bonjour");
});

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('CONNECTED TO DB');
    })
    .catch((err) => {
        console.error('DB CONNECTION ERROR:', err);
    });