const { createUser } = require('../auth');


const username = 'newUser'; 
const plainPassword = 'securePassword123'; 

createUser(username, plainPassword, (err, results) => {
    if (err) {
        console.error('Erreur lors de la création de l\'utilisateur :', err.message);
        return;
    }

    console.log('Utilisateur créé avec succès ! ID :', results.insertId);
});