const db = require('./database');
const bcrypt = require('bcrypt');


const createUser = (email, password, callback) => {
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return callback(err);
        const sql = `INSERT INTO users (email, password) VALUES (?,?)`;
        db.run(sql, [email, hash], function(err) {
            callback(err, {id: this.lastID});
        });
    });
}

const display = (callback) => {
    const sql = `SELECT * FROM users`;
    db.all(sql, [], callback);
}

const updateUser = (email, password, new_password, callback) => {
    const sql = `SELECT password FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) return callback(err);
        if (row) {
            bcrypt.compare(password, row.password, (cerr, isMatch) => {
              if (cerr) return callback(cerr);
              if (isMatch) {
                bcrypt.hash(new_password, 10, (herr, hash) => {
                    if (herr) return callback(herr);
                    else {
                        const sql = `UPDATE users SET password = ? WHERE email = ?`;
                        db.run(sql, [hash, email], (err) => {
                            if (err) return callback(err);
                            else return callback(null, true);
                        });
                            
                        }
                    });
              } else return callback(new Error('invalid credentials')); 
            });
        }
    });
}

const deleteUser = (email, password, callback) => {

    const sql = `SELECT password FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) return callback(err);
        if (row) {
            bcrypt.compare(password, row.password, (cerr, isMatch) => {
              if (cerr) return callback(cerr);
              if (isMatch) {
                const sql = `DELETE FROM users WHERE email = ?`;
                db.run(sql, email, (err) => {
                    if (err) return callback(err);
                    else return callback(null, true);
                });
              } else return callback(new Error('Wrong password')); 
            });
        }
    });
}

const login = (email, password, callback) => {

    const sql = `SELECT password FROM users WHERE email = ?`;
    db.get(sql, [email], (err, row) => {
        if (err) return callback(err);
        if (row) {
            bcrypt.compare(password, row.password, (cerr, isMatch) => {
                if (cerr) return callback(cerr);
                if (isMatch) return callback(null, true);
                else return callback(new Error('invalid email/password buddy'));
            });
        } else return callback(new Error('email not found'));
    });
}

module.exports = {createUser, display, updateUser, deleteUser, login};