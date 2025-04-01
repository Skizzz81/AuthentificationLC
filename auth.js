const bcrypt = require('bcrypt');
const connection = require('./db/dbconnection');


function verifyPassword(username, plainPassword, callback) {
   
    const query = 'SELECT password FROM user WHERE name = ?';
    connection.query(query, [username], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        if (results.length === 0) {
            return callback(new Error('Utilisateur non trouvé'), null);
        }

        const hashedPassword = results[0].password;

     
        bcrypt.compare(plainPassword, hashedPassword, (err, isMatch) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, isMatch); 
        });
    });
}


function createUser(username, plainPassword, callback) {
    // Générer un hash pour le mot de passe
    const saltRounds = 10; // Niveau de complexité du hash
    bcrypt.hash(plainPassword, saltRounds, (err, hashedPassword) => {
        if (err) {
            return callback(err, null);
        }

        // Insérer l'utilisateur dans la base de données
        const query = 'INSERT INTO user (name, password) VALUES (?, ?)';
        connection.query(query, [username, hashedPassword], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, results); // Retourne les résultats de l'insertion
        });
    });
}


module.exports = { verifyPassword,createUser };
