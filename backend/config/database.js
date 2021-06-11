const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('data.db');

const USER_SCHEMA = `
CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    user_name VARCHAR(30) NOT NULL UNIQUE, 
    user_email VARCHAR(255) NOT NULL, 
    user_password VARCAHR(255) NOT NULL,
    user_full_name VARCAHR(40) NOT NULL, 
    user_join_date TIMESTAMP DEFAULT current_timestamp
)
`;

const INSERT_DEFAULT_USER_1 = 
`
INSERT INTO user (
    user_name, 
    user_email,
    user_password,
    user_full_name
) SELECT 'wagner', 'wagner@hotmail.com', '12345678', 'Wagner Alves' WHERE NOT EXISTS (SELECT * FROM user WHERE user_name = 'wagner')
`;

const IMOVEIS_SCHEMA = 
`
CREATE TABLE IF NOT EXISTS imoveis (
    imovel_id INTEGER PRIMARY KEY AUTOINCREMENT,
    imovel_post_date TIMESTAMP NOT NULL, 
    imovel_change_date TIMESTAMP, 
    photo_url TEXT NOT NULL, 
    descricao TEXT DEFAULT ('') NOT NULL, 
    user_id INTEGER,
    titulo VARCHAR(255), 
    anoimovel INTEGER, 
    valor FLOAT, 
    cep VARCHAR(255), 
    logradouro VARCHAR(255), 
    numero VARCHAR(255), 
    complemento VARCHAR(255), 
    bairro VARCHAR(255), 
    cidade VARCHAR(255), 
    estado VARCHAR(255), 
    area VARCHAR(255), 
    quartos VARCHAR(255), 
    banheiros VARCHAR(255), 
    garagem VARCHAR(255), 
    idstatus INTEGER, 
    status VARCHAR(255), 
    idtipo INTEGER, 
    tipo VARCHAR(255),
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
)
`;
  

const COMMENT_SCHEMA =
`
CREATE TABLE IF NOT EXISTS comment (
    comment_id INTEGER   PRIMARY KEY AUTOINCREMENT,
    comment_date TIMESTAMP NOT NULL,
    comment_text TEXT  DEFAULT (''),
    photo_id INTEGER,
    user_id INTEGER,
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE 
);
`;

const LIKE_SCHEMA = `
CREATE TABLE IF NOT EXISTS like (
    like_id INTEGER PRIMARY KEY AUTOINCREMENT, 
    photo_id INTEGER,
    user_id  INTEGER,
    like_date TIMESTAMP DEFAULT current_timestamp, 
    UNIQUE(user_id, photo_id ),
    FOREIGN KEY (photo_id) REFERENCES photo (photo_id) ON DELETE CASCADE,
    FOREIGN KEY(user_id) REFERENCES user(user_id) ON DELETE CASCADE
)
`;

db.serialize(() => {
    db.run("PRAGMA foreign_keys=ON");
    db.run(USER_SCHEMA);
    db.run(INSERT_DEFAULT_USER_1);
    db.run(IMOVEIS_SCHEMA);        
    db.run(COMMENT_SCHEMA);     
    db.run(LIKE_SCHEMA);        

    db.each("SELECT * FROM user", (err, user) => {
        console.log('Users');
        console.log(user);
    });
});

process.on('SIGINT', () =>
    db.close(() => {
        console.log('Database closed');
        process.exit(0);
    })
);

module.exports = db;