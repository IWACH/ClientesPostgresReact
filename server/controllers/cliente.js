const { DB } = require("../config/db.config");
const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

const createCliente = async (req, res, next) => {
  if (!req.body.nombre) {
    res.status(400).send({
      message: "Cliente necesita un nombre",
    });
    return;
  }
  if (!req.body.apellido) {
    res.status(400).send({
      message: "Cliente necesita un apellido",
    });
    return;
  }
  if (!req.body.fecnac) {
    res.status(400).send({
      message: "Cliente necesita fecha de nacimiento",
    });
    return;
  }
  const cliente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    fecnac: req.body.fecnac,
  };
  Cliente.create(cliente)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo sucedió al crear al cliente.",
      });
    });
};

const getAllClientes = async (req, res, next) => {
  Cliente.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Algo sucedió al obtener los clientes.",
      });
    });
};

const getCliente = async (req, res) => {
  const id = req.params.id;
  Cliente.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No se encontró cliente con id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Hubo un error trayendo cliente con id=" + id,
      });
    });
};

const updateCliente = async (req, res) => {
  const id = req.params.id;
  Cliente.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Cliente se actualizó exitosamente.",
        });
      } else {
        res.send({
          message: `No se puede actualizar el cliente con el id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Hubo un error al actualizar el cliente con id=" + id,
      });
    });
};

const deleteCliente = async (req, res) => {
  const id = req.params.id;
  Cliente.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Se borró exitosamente!",
        });
      } else {
        res.send({
          message: `No se puede borrar el cliente con el id=${id}!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "No se puede borrar el cliente con el id=" + id,
      });
    });
};

const getPromedioEdad = (req, res) => {
db.sequelize.query("SELECT avg(date_part('year', age(fecnac)))\"promedio\" FROM public.Clientes;").then((results)=>{
  res.status(200).send(results[0][0]);
});
}

module.exports = {
  createCliente,
  getAllClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  getPromedioEdad,
};
