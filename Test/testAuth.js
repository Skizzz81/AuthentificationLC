const { verifyPassword } = require('../auth');

// Exemple de test
const username = 'newUser'; 
const truePassword = 'securePassword123';
const falsePassword = 'wrongPassword';

verifyPassword(username, falsePassword, (err, isMatch) => {
    if (err) {
        console.error('Erreur :', err.message);
        return;
    }

    if (isMatch) {
        console.log('Mot de passe valide !');
    } else {
        console.log('Mot de passe invalide.');
    }
});