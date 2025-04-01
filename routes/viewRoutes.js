const express = require('express');
const router = express.Router();

// Route pour afficher le formulaire Sign Up
router.get('/', (req, res) => {
    res.render('signUpForm', { message: null });
});

// Route pour afficher le formulaire Sign In
router.get('/signin', (req, res) => {
    res.render('signInForm', { message: null });
});

module.exports = router;