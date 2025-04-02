const express = require('express');
const authenticate = require('../middleware/authMiddleware'); // Importer le middleware

const router = express.Router();

// Route pour le tableau de bord
router.get('/dashboard', authenticate, (req, res) => {
    res.render('dashboard', { user: req.user });
});

// Route pour la déconnexion
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = router;