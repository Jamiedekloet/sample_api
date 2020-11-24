const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const authJwt = require("./middleware/authJwt");

const authController = require('./controllers/authController');
const animalController = require('./controllers/animalController');

app.use(bodyParser.urlencoded({ extended: true }));


app.post('/login', function(req, res) {
    authController.signin(req, res);
});

app.get('/animals', function(req, res) {
    if(authJwt.verifyToken(req, res)) {
        animalController.getAll(req, res);
    }
});

app.post('/animals', function(req, res) {
    if(authJwt.verifyToken(req, res)) {
        animalController.addAnimal(req, res);
    }
});

app.delete('/animals/:id', function(req, res) {
    if(authJwt.verifyToken(req, res)) {
        animalController.deleteAnimal(req, res);
    }
});

app.listen(port, () => {
    console.log(`sample api listening at http://localhost:${port}`)
});