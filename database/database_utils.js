const db = require('./database.js');

const bcrypt = require('bcrypt');

export function initTables(){
db.run(`
    CREATE TABLE IF NOT EXISTS admins (
        login_id VARCHAR(255) PRIMARY KEY,
        pass VARCHAR(255) NOT NULL
    );
`);
db.run(`
CREATE TABLE IF NOT EXISTS album (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    url VARCHAR(255),
    pass VARCHAR(255),
    description TEXT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`)
db.run(`
CREATE TABLE IF NOT EXISTS image (
    uid TINYTEXT PRIMARY KEY NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    preview BLOB,
    pinned BOOLEAN DEFAULT FALSE,
    album_id INTEGER NOT NULL FOREIGN KEY REFERENCES album(id)
);
`)
}

const insertAdmin = async (name, password) => {
    const passwordPolicyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordPolicyRegex.test(password)) {
        throw new Error('Password is insecure');
    }   

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run(`
        INSERT INTO admins (login_id, pass)
        VALUES (?, ?)
    `, [name, hashedPassword]);
};
