import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config'; // Add this line at the top
import filmRoutes from "./routes/film.route.js";
import userRoutes from "./routes/user.route.js";
import cors from 'cors'
import authRoutes from './routes/auth.js'
import { fileURLToPath } from 'url';
import path from 'path';
import tmdbRoutes from './routes/tmdb.route.js'

const app = express();

// pour accepter JSON dans le DB middleware
app.use(express.json())
app.use(cors());

//app.use("/api/films", filmRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", tmdbRoutes);
//app.use("/api/favorites", favRoutes);
//app.use("/api/history", histRoutes);
//app.use("/api/reviews", revRoutes);
//app.use("/api/comments", commRoutes);
//app.use("/api/videos", vidRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initializer le serveur dans le port 1111
app.listen(1111, () => {
    console.log('Server is running on port 1111');
});

const rootDir = path.join(__dirname, '../../')

// lier le backend avec le fontend
app.use(express.static(path.join(rootDir, 'dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'dist', 'index.html'))
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('CONNECTED TO DB');
    })
    .catch((err) => {
        console.error('DB CONNECTION ERROR:', err);
    });