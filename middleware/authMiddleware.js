const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

function authenticate(req, res, next) {
    const token = req.cookies.token;
    console.log('Token :', token);
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

module.exports = authenticate;