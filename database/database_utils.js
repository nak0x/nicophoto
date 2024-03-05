const db = require("./database.js");

const bcrypt = require("bcrypt");

exports.initTables = () => {
  db.run(`
        CREATE TABLE IF NOT EXISTS admins (
            login_id VARCHAR(255) PRIMARY KEY,
            pass VARCHAR(255) NOT NULL
        );
    `);
  db.run(`
    CREATE TABLE IF NOT EXISTS album (
        uid TINYTEXT PRIMARY KEY NOT NULL,
        title VARCHAR(255),
        url VARCHAR(255),
        password VARCHAR(255),
        description TEXT,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (url)
    );
    `);
  db.run(`
    CREATE TABLE IF NOT EXISTS image (
        uid TINYTEXT PRIMARY KEY NOT NULL,
        name VARCHAR(255) DEFAULT NULL,
        preview BLOB,
        pinned INTEGER DEFAULT 0,
        album_uid INTEGER NOT NULL,
        mime_type VARCHAR(255) DEFAULT NULL,
        FOREIGN KEY(album_uid) REFERENCES album(uid)
    );
    `);
};

exports.insertAdmin = async (login_id, password) => {
  const passReg = new RegExp(process.env.PASS_POLICY);

  if (!passReg.test(password)) {
    console.error("Password is insecure");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    db.run(
      `
            INSERT OR IGNORE INTO admins (login_id, pass) 
            VALUES (?, ?)
        `,
      [login_id, hashedPassword]
    );
  } catch (error) {
    console.error(error);
  }
};

/**
 * Get all datas from albums from the uid
 * @param {String} uid Get the uid of the album
 * @returns {Object} The album object
 */
exports.selectAlbumWithPhotos = async (uid) => {
  try {
    const album = await db.get(`SELECT * FROM album WHERE uid = ?`, [uid]);
    const photos = await db.all(`SELECT * FROM image WHERE album_uid = ?`, [
      album.id,
    ]);
    return { album, photos };
  } catch (err) {
    return {};
  }
};

/**
 * Get the credentials of an album by its ID
 * @param {Number} id - The ID of the album
 * @returns {Object} - The credentials object containing the ID and password of the album or an empty object if the album id doesn't exist.
 */
exports.getCredentials = async (id) => {
  try {
    const album = await db.get(`SELECT * FROM album WHERE id = ?`, [id]);
    if (album) {
      return {
        id: album.id,
        pass: album.pass,
      };
    } else {
      return {};
    }
  } catch (err) {
    console.error(err);
    return {};
  }
};

/**
 * Get the credentials of an album by its ID
 * @param {Number} id - The ID of the album
 * @returns {Object} - The credentials object containing the ID and password of the album or an empty object if the album id doesn't exist.
 */
exports.getAdminCredentials = async (id) => {
  try {
    const admin = await db.get(`SELECT * FROM admins WHERE login_id = ?`, [id]);
    if (admin) {
      return {
        id: admin.id,
        pass: admin.pass,
      };
    } else {
      console.error(`Try to reach the admin ${id}, but the admin does not exist`)
      return {};
    }
  } catch (err) {
    console.error(err);
    return {};
  }
};
