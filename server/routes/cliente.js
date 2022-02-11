const { Router } = require("express");
const {
  createCliente,
  getAllClientes,
  getCliente,
  updateCliente,
  deleteCliente,
  getPromedioEdad,
} = require("../controllers/cliente");

const router = Router();

router.get("/clientes", getAllClientes);
router.get("/cliente/:id", getCliente);
router.post("/cliente", createCliente);
router.delete("/cliente/:id", deleteCliente);
router.put("/cliente/:id", updateCliente);
router.get("/clientes/promedio-edad", getPromedioEdad);

module.exports = router;
