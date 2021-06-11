const express = require('express')
    , app = express()
    , path = require('path')
    , cors = require('cors')
    , db = require('./database')
    , multer = require('multer')
    , uuidv4 = require('uuid/v4')
    , fs = require('fs')
    , { imovelRoutes,  userRoutes } = require('../app/routes');


const uploadDir = './uploads';
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
    fs.mkdirSync(uploadDir + '/imgs');
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/imgs')
    },
    filename: function (req, file, cb) {
        cb(null, `${uuidv4()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    fileFilter(req, file, cb) {
        console.log("Receiving image file")
        cb(null, true)
    }
});

app.set('secret', 'sua frase seceta aqui');
app.set('upload', upload);

const corsOptions = {
    exposedHeaders: ['x-access-token']
};
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('uploads'));
app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
    req.db = db;
    next();
});

app.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    console.log('####################################');
    if(token) {
        console.log('Token enviado');
        console.log('Token value is ' + token);
    } else {
        console.log('Nenhum token foi enviado');
    }
    console.log('####################################');
    next();
});

userRoutes(app);
imovelRoutes(app);


app.use('*', (req, res) => {
    res.status(404).json({ message: `rota ${req.originalUrl} não existe!` });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal server error' });
});

module.exports = app;