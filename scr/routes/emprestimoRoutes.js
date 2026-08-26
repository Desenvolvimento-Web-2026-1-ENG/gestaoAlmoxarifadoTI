const express = require("express");

const router = express.Router();

const {
    listarEmprestimos,
    buscarEmprestimoPorId,
    cadastrarEmprestimo,
    devolverEmprestimo
} = require("../controllers/emprestimoController");

router.get("/", listarEmprestimos);

router.get("/:id", buscarEmprestimoPorId);

router.post("/", cadastrarEmprestimo);

router.put("/:id", devolverEmprestimo);

module.exports = router;