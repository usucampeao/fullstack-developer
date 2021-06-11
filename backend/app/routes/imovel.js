const { imovelAPI } = require('../api'),
path = require('path'),
    { wrapAsync, auth } = require('../infra')

module.exports = app => {

    app.route('/:userName/imoveis')
        .get(wrapAsync(imovelAPI.list));
    
    app.route('/imoveis')
        .get(wrapAsync(imovelAPI.listAll));
        
    app.route('/imoveis/upload')
        .post(auth, app.get('upload').single('imageFile'), wrapAsync(imovelAPI.Upload))
        .put(auth, app.get('upload').single('imageFile'), wrapAsync(imovelAPI.Upload))
       

    app.route('/imoveis/:imovelId')
        .post(auth, wrapAsync(imovelAPI.add))
        .delete(auth, wrapAsync(imovelAPI.remove))
        .get(wrapAsync(imovelAPI.findById));
 
    app.route('/imoveis/user/:userId')
        .get(auth, wrapAsync(imovelAPI.imovelUser));
}; 