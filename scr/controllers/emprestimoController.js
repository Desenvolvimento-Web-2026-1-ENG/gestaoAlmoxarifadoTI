const {
    equipamentos,
    alunos,
    emprestimos
} = require("../data/database");

function formatarData(data) {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}-${mes}-${ano}`;
}

function listarEmprestimos(req, res) {

    const emprestimosComAluno = emprestimos.map(emprestimo => {

        const aluno = alunos.find(
            aluno => aluno.id === emprestimo.alunoId
        );

        return {
            ...emprestimo,
            nomeAluno: aluno ? aluno.nome : "Aluno não encontrado"
        };
    });

    res.status(200).json(emprestimosComAluno);
}

function buscarEmprestimoPorId(req, res) {

    const id = Number(req.params.id);

    const emprestimo = emprestimos.find(
        emprestimo => emprestimo.id === id
    );

    if (!emprestimo) {
        return res.status(404).json({
            erro: "Empréstimo não encontrado."
        });
    }

    const aluno = alunos.find(
        aluno => aluno.id === emprestimo.alunoId
    );

    const emprestimoComAluno = {
        ...emprestimo,
        nomeAluno: aluno ? aluno.nome : "Aluno não encontrado"
    };

    res.status(200).json(emprestimoComAluno);
}

function cadastrarEmprestimo(req, res) {

    const {
        alunoId,
        equipamentoIds,
        dataDevolucaoPrevista
    } = req.body;

    if (
        !alunoId ||
        !equipamentoIds ||
        !Array.isArray(equipamentoIds) ||
        equipamentoIds.length === 0 ||
        !dataDevolucaoPrevista
    ) {
        return res.status(400).json({
            erro: "Aluno, equipamentos e data de devolução prevista são obrigatórios."
        });
    }

    const aluno = alunos.find(
        aluno => aluno.id === Number(alunoId)
    );

    if (!aluno) {
        return res.status(404).json({
            erro: "Aluno não encontrado."
        });
    }

    const equipamentosSelecionados = equipamentoIds.map(
        id => equipamentos.find(
            equipamento => equipamento.id === Number(id)
        )
    );

    const equipamentoInexistente = equipamentosSelecionados.some(
        equipamento => !equipamento
    );

    if (equipamentoInexistente) {
        return res.status(404).json({
            erro: "Um ou mais equipamentos não foram encontrados."
        });
    }

    const equipamentoIndisponivel = equipamentosSelecionados.find(
        equipamento =>
            equipamento.status === "Em Manutenção" ||
            equipamento.status === "Em Uso"
    );

    if (equipamentoIndisponivel) {
        return res.status(400).json({
            erro: `O equipamento ${equipamentoIndisponivel.id} não está disponível para empréstimo.`
        });
    }

    const novoEmprestimo = {
        id: emprestimos.length + 1,
        alunoId: Number(alunoId),
        equipamentoIds: equipamentoIds.map(id => Number(id)),
        dataEmprestimo: formatarData(new Date()),
        dataDevolucaoPrevista,
        status: "Ativo"
    };

    emprestimos.push(novoEmprestimo);

    equipamentoIds.forEach(id => {

        const equipamento = equipamentos.find(
            equipamento => equipamento.id === Number(id)
        );

        equipamento.status = "Em Uso";
    });

    res.status(201).json(novoEmprestimo);
}

module.exports = {
    listarEmprestimos,
    buscarEmprestimoPorId,
    cadastrarEmprestimo
};