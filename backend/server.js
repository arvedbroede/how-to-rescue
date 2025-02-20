require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // Erlaubt Frontend-Zugriff

// API-Key sicher abrufen
app.get('/maps-api-key', (req, res) => {
    res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(3000, () => console.log('✅ Backend läuft auf http://localhost:3000'));
