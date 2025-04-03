const express = require('express');
const { createUser, verifyPassword } = require('../auth');

const router = express.Router(); // Utilisation d'un routeur Express
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';

router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        
        return res.status(400).render('signUpForm', { status: 400, message: 'Username and password sont requis.' });
    }

    createUser(username, password, (err, results) => {
        if (err) {
            console.error('Erreur lors de la création de l\'utilisateur :', err.message);
          
            return res.status(500).render('signUpForm', { status: 500, message: 'Error creation de utilisateur' });
        }

        console.log('Utilisateur créé avec succès ! ID :', results.insertId);
      
        res.status(201).render('signUpForm', { status: 201, message: 'Utilisateur enregistre ! ' });
    });
});

// Route: Signin
router.post('/signin', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        // Passer un message d'erreur à la vue
        return res.status(400).render('signInForm', { status: 400, message: 'Username et password requis' });
    }

    verifyPassword(username, password, (err, user) => {
        if (err) {
            console.error('Erreur :', err.message);
            return res.status(500).render('signInForm', { status: 500, message: 'Erreur interne du serveur' });
        }

        if (user) {
            console.log('Mot de passe valide !');

            // Générer le token JWT avec les informations de l'utilisateur
            const token = jwt.sign(
                { id: user.id, username: user.name, role: user.role_id },
                SECRET_KEY,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, { httpOnly: true, secure: false });

            return res.status(200).render('signInForm', { status: 200, message: 'Identifiants valides !' });
        } else {
            console.log('Mot de passe invalide.');
            return res.status(401).render('signInForm', { status: 401, message: 'Identifiants invalides !' });
        }
    });
});


module.exports = router; 