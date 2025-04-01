const express = require('express');
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');

const app = express();
const PORT = 3000;

// Configurer le moteur de rendu
app.set('view engine', 'ejs');

// Middleware pour traiter les données JSON et les formulaires
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', viewRoutes); // Routes pour les pages (Sign Up, Sign In)
app.use('/auth', authRoutes); // Routes pour l'authentification

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});