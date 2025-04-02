const express = require('express');
const authRoutes = require('./routes/authRoutes');
const viewRoutes = require('./routes/viewRoutes');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_secret_key';

// Configurer le moteur de rendu
app.set('view engine', 'ejs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.log('Token non trouvé');
        return res.redirect('/signin');
    }
    try {
    const user = jwt.verify(token, JWT_SECRET);
    req.user = user;
    next();
    } catch {
    console.log('Token invalide');   
    res.redirect('/signin');
    }
}


// Routes
app.use('/', viewRoutes); // Routes pour les pages (Sign Up, Sign In)
app.use('/auth', authRoutes); // Routes pour l'authentification


app.get('/dashboard', authenticate, (req, res) => {
    res.render('dashboard', { user: req.user });
   });
   
// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});