const express = require('express');
const urlRoutes = require('./routes/url-routes')

const app = express();
const PORT = 5000;

app.use(express.json());


const database = require('./database/database');

const UrlRepository = require('./repository/url-repository');
const UrlService = require('./service/url-service');
const UrlController = require('./controller/url-controller');

const urlRepository = new UrlRepository(database);
const urlService = new UrlService(urlRepository);
const urlController = new UrlController(urlService);

app.use('/', urlRoutes(urlController));
app.listen(PORT, ()=>{

console.log('Rodando na porta 5000')
});