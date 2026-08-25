const { alunos } = require("../data/database");

function listarAlunos(req, res) {
    res.status(200).json(alunos);
}

function buscarAlunoPorId(req, res) {

    const id = Number(req.params.id);

    const aluno = alunos.find(
        aluno => aluno.id === id
    );

    if (!aluno) {
        return res.status(404).json({
            erro: "Aluno não encontrado."
        });
    }

    res.status(200).json(aluno);
}

function cadastrarAluno(req, res) {

    const {
        nome,
        matricula,
        curso
    } = req.body;

    if (!nome || !matricula || !curso) {
        return res.status(400).json({
            erro: "Nome, matrícula e curso são obrigatórios."
        });
    }

    const nomeExiste = alunos.some(
        aluno => aluno.nome === nome
    );

    if (nomeExiste) {
        return res.status(400).json({
            erro: "Nome já cadastrado."
        });
    }

    const novoAluno = {
        id: alunos.length + 1,
        nome,
        matricula,
        curso
    };

    alunos.push(novoAluno);

    res.status(201).json(novoAluno);
}

function atualizarAluno(req, res) {

    const id = Number(req.params.id);

    const aluno = alunos.find(
        aluno => aluno.id === id
    );

    if (!aluno) {
        return res.status(404).json({
            erro: "Aluno não encontrado."
        });
    }

    const {
        nome,
        matricula,
        curso
    } = req.body;

    if (!nome || !matricula || !curso) {
        return res.status(400).json({
            erro: "Nome, matrícula e curso são obrigatórios."
        });
    }

    const nomeExiste = alunos.some(
        aluno =>
            aluno.nome === nome &&
            aluno.id !== id
    );

    if (nomeExiste) {
        return res.status(400).json({
            erro: "Aluno já cadastrado."
        });
    }

    aluno.nome = nome;
    aluno.matricula = matricula;
    aluno.curso = curso;

    res.status(200).json(aluno);
}

function excluirAluno(req, res) {

    const id = Number(req.params.id);

    const index = alunos.findIndex(
        aluno => aluno.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            erro: "Aluno não encontrado."
        });
    }

    alunos.splice(index, 1);

    res.status(204).send();
}


module.exports = {
    listarAlunos,
    buscarAlunoPorId,
    cadastrarAluno,
    atualizarAluno,
    excluirAluno
};