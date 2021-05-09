const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


///////////////////////////////////////////////////////////////////
const FunctionApi = require('./functions/functionsApi');
const { response } = require('express');
///////////////////////////////////////////////////////////////////
const app = express();
const port = 8080;
const funcApi = new FunctionApi();

///////////////////////////////////////////////////////////////////
app.use(morgan('dev')); // Para logs de execução
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // Defini como vai receber os dados 'JSON'
app.use(cors());
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
// ROUTERS ~
app.get('/', (req, res) => {

    funcApi.getHouses().then( response => {
        // console.log('response', response);
        res.json( response );
    } );

});

app.post('/addImmobile', (req, res) => {
    funcApi.addItem( req.body ).then(response => {
        res.statusCode = response.statusCode;
        res.json( response );
    });
});

app.get('/getImmobiles', (req, res) => {
    funcApi.getHouses().then( response => {
        res.json( response );
    } );
});

app.post('/removeImmobile', (req, res) => {

});

app.put('/updateImmobile', (req, res) => {
  console.log(req.body);
  funcApi.updateItem( req.body ).then(response => {
    res.statusCode = response.statusCode;
    res.json( response );
});
});
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
app.listen(port, () => {
    usuCampPe();
});
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////



function usuCampPe() {
    console.log('                                                                                                                          ');
    console.log('                                                                                         888   88                                  ');
    console.log('                                                                                      88  8888                                    ');
    console.log('              88     88      8888888888  888888888  88      88  8888888888  88888888  888888888  888888888                       ');
    console.log('              88     88      88          88     88  8888  8888  88      88  88        88     88  88     88                       ');
    console.log('              88     88      88          88     88  88  88  88  88      88  88        88     88  88     88                       ');
    console.log('              88     88      88          88     88  88      88  8888888888  88888888  88     88  88     88                          ');
    console.log('              88     88      88          888888888  88      88  88          88        888888888  88     88                        ');
    console.log('              88     88 8888 88          88     88  88      88  88          88        88     88  88     88                       ');
    console.log('              888888888 8888 8888888888  88     88  88      88  88          88888888  88     88  888888888                             ');
    console.log('')
    console.log('                                          Server started on http://localhost:' + port);
}
