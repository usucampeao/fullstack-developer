const { ImovelDao , UserDao } = require('../infra')
    , jimp = require('jimp')
    , path = require('path')
    , fs = require('fs')
    , unlink = require('util').promisify(fs.unlink);

const api = {}

const userCanDelete = user => imoveis => photo.userId == user.id;

const defaultExtension = '.jpg';

api.list = async (req, res) => {
    console.log('####################################');
    const { userName } = req.params;
    const { page } = req.query;
    const user = await new UserDao(req.db).findByName(userName);
    if(user) {
        console.log(`Listing photos`);
        const imoveis = await new ImovelDao(req.db)
            .listAllFromUser(userName, page);
        res.json(photos);
    } else {
        res.status(404).json({ message: 'User not found'});
    }
    
}

api.listAll = async (req, res) => {
    console.log('####################################');
    const { page } = req.query;
   
    console.log(`Listing imoveis`);
    const imoveis = await new ImovelDao(req.db).listAll(page);
    res.json(imoveis);
    
    
}

api.add = async (req, res) => {
    console.log('####################################');
    console.log('Received JSON data', req.body);
    const photo = req.body;
    photo.file = '';
    const id = await new ImovelDao(req.db).add(photo, req.user.id);
    res.json(id);
};

api.Upload = async (req, res) => {
        console.log('upload complete');
        console.log('Photo data', req.body);
        console.log('File info', req.file);

       const image = await jimp.read(req.file.path);

       await image
            .cover(460, 460)
            .autocrop()
            .write(req.file.path);  
                
        const imovel = req.body;
        imovel.url = path.basename(req.file.path);
        if(req.body.action === 'add'){
            console.log('o que estou mandando incluir', imovel)
            await new ImovelDao(req.db).add(imovel, req.user.id);
            res.status(200).end();       
        }else {
            console.log('o que estou mandando alterar', imovel)
            await new ImovelDao(req.db).upd(imovel, req.user.id);
            res.status(200).end();
        }
};


api.findById = async (req, res) => {
    const { imovelId } = req.params;
    console.log('####################################');
    console.log(`Buscando imoveis pelo ID ${imovelId}`)
    const imovel = await new ImovelDao(req.db).findById(imovelId);
    if(imovel) {
        res.json(imovel);
    } else {
        res.status(404).json({ message: 'Dados Nao existem' })
    }  
};

api.remove = async (req, res) => {

    const {imovelId}  = req.params;
    console.log('o que vai', imovelId)
    const dao = new ImovelDao(req.db);
    const imoveis = await dao.remove(imovelId);
     if(!imoveis) {
         const message = 'Photo does not exist';
         console.log(message);
         return res.status(404).json({ message });
     }else{
         return res.status(200).json({message: "tudo Certo"})
     }
    
};


api.imovelUser = async (req, res) => {
    const { userId } = req.params;
    console.log('####################################');
    console.log(`Buscando imoveis pelo IDUsuario ${userId}`)
    const dao = new ImovelDao(req.db);
    const imovelUser = await dao.listAllFromUser(userId);
    if(imovelUser) {
       return  res.json(imovelUser);
    }else{
        return res.status(404).json({ message: 'Dados Nao existem' })
    }
    
};

module.exports = api;