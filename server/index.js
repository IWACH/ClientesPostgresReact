const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const clienteRutas = require('./routes/cliente');
const path = require("path");

const app = express();
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.use("/api", clienteRutas);


app.use(express.static(__dirname + '/public'));

app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "public/index.html")
    );
  });

const db = require("./models");
db.sequelize.sync();

const port = process.env.PORT || 4000;
app.listen(port);
console.log("Server running in port "+ port);