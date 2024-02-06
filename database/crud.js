const db = require('./database.js');

const bcrypt = require('bcrypt');

db.run(`
    CREATE TABLE IF NOT EXISTS auth (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        password TEXT NOT NULL
    )
`);

const insertAdmin = async (name, password) => {
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
        throw new Error('Password is insecure');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(`
        INSERT INTO auth (name, password)
        VALUES (?, ?)
    `, [name, hashedPassword]);
};

insertAdmin('John Doe', 'password123*4A');