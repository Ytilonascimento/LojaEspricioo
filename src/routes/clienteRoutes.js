const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");
const {authController} = require("../controllers/authController");
const {verify} = require("../middlewares/authMiddleware");

router.post("/clientes/login", authController.clientelogin);

router.get("/clientes", verify.cliente, clienteController.listarCliente);

router.post("/clientes", clienteController.criarCliente);

module.exports = { clienteRoutes: router };
