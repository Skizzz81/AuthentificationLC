const express = require('express');

const authenticate = require('../middleware/authMiddleware');
const { isAdmin, isGuest } = require('../middleware/roleMiddleware');

const router = express.Router();
console.log({ authenticate,isAdmin,isGuest});

// Route pour afficher le formulaire Sign Up
router.get('/', (req, res) => {
    res.render('signUpForm', { message: null });
});

// Route pour afficher le formulaire Sign In
router.get('/signin', (req, res) => {
    res.render('signInForm', { message: null });
});

router.get('/admin', authenticate, isAdmin, (req, res) => {
    res.render('admin', { user: req.user });
});

router.get('/guest', authenticate , isGuest ,(req, res) => {
    res.render('guest', { user: req.user });
});



module.exports = router;