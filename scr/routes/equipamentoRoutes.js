const express = require("express");

const router = express.Router();

const {
    listarEquipamentos,
    buscarEquipamentoPorId
} = require("../controllers/equipamentoController");

router.get("/", listarEquipamentos);

router.get("/:id", buscarEquipamentoPorId);

module.exports = router;