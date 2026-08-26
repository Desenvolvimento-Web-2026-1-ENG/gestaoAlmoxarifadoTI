const express = require("express");

const router = express.Router();

const {
    listarEmprestimos,
    buscarEmprestimoPorId,
    cadastrarEmprestimo
} = require("../controllers/emprestimoController");

router.get("/", listarEmprestimos);

router.get("/:id", buscarEmprestimoPorId);

router.post("/", cadastrarEmprestimo);

module.exports = router;