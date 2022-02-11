const moment = require("moment");
module.exports = (sequelize, Sequelize) => {
  const Cliente = sequelize.define("clientes", {
    nombre: {
      type: Sequelize.STRING,
    },
    apellido: {
      type: Sequelize.STRING,
    },
    fecnac: {
      type: Sequelize.DATE,
    },
    edad: {
      type: Sequelize.VIRTUAL,
      get() {
        return moment().diff(this.fecnac, "years");
      },
      set(value) {
        throw new Error("No se llena el campo edad.");
      },
    },
  });
  return Cliente;
};
