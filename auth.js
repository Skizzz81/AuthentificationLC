const bcrypt = require('bcrypt');
const connection = require('./db/dbconnection');


function verifyPassword(username, plainPassword, callback) {
   
    connection.query('SELECT * FROM user WHERE name = ?', [username], (err, results) => {
        if (err) {
            return callback(err, null);
        }

        if (results.length === 0) {
            return callback(new Error('Utilisateur non trouvé'), null);
        }

        const user = results[0];

        // Vérifier le mot de passe
        bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
            if (err) {
                return callback(err, null);
            }

            if (isMatch) {
                // Retourner l'utilisateur si le mot de passe est valide
                return callback(null, user);
            } else {
                return callback(null, null);
            }
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
