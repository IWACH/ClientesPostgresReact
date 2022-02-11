const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const clienteRutas = require('./routes/cliente');

const app = express();
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use(clienteRutas);



const db = require("./models");
db.sequelize.sync();

app.listen(4000);
console.log("Server running in port 4000");