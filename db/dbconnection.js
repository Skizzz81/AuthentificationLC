const mysql = require('mysql2');


const connection = mysql.createConnection({
    host: 'localhost',     
    user: 'root',           
    password: '1503', 
    database: 'AuthentificationLC' 
});


connection.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err.message);
        return;
    }
    console.log('Connexion réussie à la base de données AuthentificationLC');
});


module.exports = connection;