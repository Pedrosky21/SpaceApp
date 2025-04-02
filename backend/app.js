const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');

const connectDB = require('./app/config/db.config')
const authRoutes = require('./app/routes/auth.routes');
const noteRoutes = require('./app/routes/notes.routes');

require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true // Para que el cliente pueda enviar cookies
}));
app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto " + PORT);
});

module.exports = app;
