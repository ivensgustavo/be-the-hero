const express = require('express');

const SessionController = require('./controllers/SessionController');
const OngController = require('./controllers/OngController');
const ProfileConttroller = require('./controllers/ProfileController')
const IndicentController = require('./controllers/IncidentController');

const routes = express.Router();

routes.post('/sessions', SessionController.create);

routes.get('/ongs', OngController.index)
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileConttroller.index);

routes.get('/incidents', IndicentController.index);
routes.post('/incidents', IndicentController.create);
routes.delete('/incidents/:id', IndicentController.delete);

module.exports = routes;