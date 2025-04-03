function isAdmin(req, res, next) {
    if (req.user && req.user.role === 1) {
        return next();
    }
    console.log('Accès refusé : utilisateur non admin');
    return res.status(403).send('Accès refusé : administrateurs uniquement.');
}


function isGuest(req, res, next) {
    if (req.user && req.user.role === 2) {
        return next();
    }
    console.log('Accès refusé : utilisateur non guest');
    return res.status(403).send('Accès refusé : invités uniquement.');
}



module.exports = { isAdmin, isGuest };