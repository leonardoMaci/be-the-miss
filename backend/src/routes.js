const express = require('express');

const OngController = require('./controllers/OngController');
const InicidentController = require('./controllers/InicidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();


routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.listIncidentsByIdOng);

routes.get('/incidents', InicidentController.index);
routes.post('/incidents', InicidentController.create);
routes.delete('/incidents/:id', InicidentController.delete);

module.exports = routes;