const express = require('express');
const router = express.Router();
const path = require('path');
const homeControler = require('./src/controllers/homeController');
const loginControler = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');

const {loginRequired} = require('./src/middlewares/routeMiddleware')

// homepage routes
router.get('/', homeControler.index);

//login routes
router.get('/login', loginControler.index);
router.post('/login/register', loginControler.registerUser);
router.post('/login/entry', loginControler.entry);
router.get('/login/logout', loginControler.logout);

// contato routes 
router.get('/contato', loginRequired, contatoController.index);
router.post('/contato/register', loginRequired, contatoController.registerContato);
router.get('/contato/index/:id', loginRequired, contatoController.edit);
router.post('/contato/edit/:id', loginRequired, contatoController.editContato);
router.get('/contato/delete/:id', loginRequired, contatoController.delete);

// error routes
router.use((req, res) => {
  res.status(404).render('404', {
    title: '404'
  });
});

module.exports = router;