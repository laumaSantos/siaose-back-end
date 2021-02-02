const express = require('express');
const cors = require('cors');
const path = require('path');

const routes = require('./routes'); // Importa as rotas da aplicação

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(express.json());
app.use(routes);

let port = (process.env.PORT || 3333)
server.listen(port, console.log('Server running on port:', port))

// server.listen(3333);