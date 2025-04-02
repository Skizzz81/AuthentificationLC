const express = require('express');
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');
const authenticate = require('./middleware/authMiddleware');
const dashboardRoutes = require('./routes/dashboardRoutes');


const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_secret_key';

// Configurer le moteur de rendu
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/', viewRoutes); // Routes pour les pages (Sign Up, Sign In)
app.use('/auth', authRoutes); // Routes pour l'authentification
app.use('/', dashboardRoutes); // Middleware pour l'authentification

   
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});