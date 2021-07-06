/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import ImmobilesController from 'App/Controllers/Http/ImmobilesController';

//Routes GET
Route.get('/show/:id', 'ImmobilesController.show');
Route.get('/search/zipcode/:zipCode', 'ImmobilesController.searchZipCode');
Route.get('/list/:page?/:limit?', 'ImmobilesController.index');

//Routes POST
Route.post('/', 'ImmobilesController.store');
Route.post('/insert/all', 'ImmobilesController.storeAll');
Route.post('/fetch', 'ImmobilesController.fetch');

//Routes PUT
Route.put('/:id', 'ImmobilesController.update');

//Route DELETE
Route.delete('/:id', 'ImmobilesController.delete');
