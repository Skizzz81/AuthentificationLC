const bcrypt = require('bcrypt');

const adminPassword = 'admin'; 
const guestPassword = 'guest'; 
const saltRounds = 10;

bcrypt.hash(guestPassword, saltRounds, (err, hashedPassword) => {
    if (err) {
        console.error('Erreur lors du hachage du mot de passe :', err);
    } else {
        console.log('Mot de passe haché :', hashedPassword);
        console.log(`INSERT INTO user (name, password, role_id) VALUES ('guest', '${hashedPassword}', 2);`);
    }
});


