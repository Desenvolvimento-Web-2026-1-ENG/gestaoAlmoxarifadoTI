const express = require("express");

const router = express.Router();

const {
    listarEquipamentos,
    buscarEquipamentoPorId,
    cadastrarEquipamento,
    atualizarEquipamento,
    excluirEquipamento
} = require("../controllers/equipamentoController");

router.get("/", listarEquipamentos);

router.get("/:id", buscarEquipamentoPorId);

router.post("/", cadastrarEquipamento);

router.put("/:id", atualizarEquipamento);

router.delete("/:id", excluirEquipamento);

module.exports = router;