const express = require("express");

const router = express.Router();

const {
    listarAlunos,
    buscarAlunoPorId,
    cadastrarAluno,
    atualizarAluno,
    excluirAluno
} = require("../controllers/alunoController");

router.get("/", listarAlunos);

router.get("/:id", buscarAlunoPorId);

router.post("/", cadastrarAluno);

router.put("/:id", atualizarAluno);

router.delete("/:id", excluirAluno);

module.exports = router;