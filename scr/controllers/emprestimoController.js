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

    const { status, alunoId } = req.query;

    let resultado = emprestimos;

    if (status) {
        resultado = resultado.filter(
            emprestimo =>
                emprestimo.status.toLowerCase() === status.toLowerCase()
        );
    }

    if (alunoId) {
        resultado = resultado.filter(
            emprestimo =>
                emprestimo.alunoId === Number(alunoId)
        );
    }

    const emprestimosComAluno = resultado.map(emprestimo => {

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

    // Validação dos dados obrigatórios
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

    // Verifica se o aluno existe
    const aluno = alunos.find(
        aluno => aluno.id === Number(alunoId)
    );

    if (!aluno) {
        return res.status(404).json({
            erro: "Aluno não encontrado."
        });
    }

    // Procura os equipamentos solicitados
    const equipamentosSelecionados = equipamentoIds.map(
        id => equipamentos.find(
            equipamento => equipamento.id === Number(id)
        )
    );

    // Verifica se algum equipamento não existe
    const equipamentosInexistentes = equipamentosSelecionados
        .filter(equipamento => !equipamento);

    if (equipamentosInexistentes.length > 0) {
        return res.status(404).json({
            erro: "Um ou mais equipamentos não foram encontrados."
        });
    }

    // Separa equipamentos disponíveis e indisponíveis
    const equipamentosDisponiveis = equipamentosSelecionados.filter(
        equipamento => equipamento.status === "Disponível"
    );

    const equipamentosIndisponiveis = equipamentosSelecionados.filter(
        equipamento =>
            equipamento.status === "Em Uso" ||
            equipamento.status === "Em Manutenção"
    );

    // Caso NENHUM equipamento esteja disponível
    if (equipamentosDisponiveis.length === 0) {

        const nomesIndisponiveis = equipamentosIndisponiveis.map(
            equipamento =>
                `${equipamento.nome} (${equipamento.status})`
        );

        return res.status(400).json({
            erro: "Nenhum dos equipamentos solicitados está disponível.",
            equipamentosIndisponiveis: nomesIndisponiveis
        });
    }

    // Cria o empréstimo somente com os equipamentos disponíveis
    const novoEmprestimo = {
        id: emprestimos.length + 1,
        alunoId: Number(alunoId),

        equipamentoIds: equipamentosDisponiveis.map(
            equipamento => equipamento.id
        ),

        dataEmprestimo: formatarData(new Date()),

        dataDevolucaoPrevista,

        status: "Ativo"
    };

    // Adiciona o empréstimo ao banco
    emprestimos.push(novoEmprestimo);

    // Altera o status dos equipamentos emprestados
    equipamentosDisponiveis.forEach(
        equipamento => {
            equipamento.status = "Em Uso";
        }
    );

    // Monta a resposta
    const resposta = {
        mensagem: "Empréstimo realizado com sucesso.",

        emprestimo: novoEmprestimo,

        quantidadeSolicitada: equipamentoIds.length,

        quantidadeEmprestada: equipamentosDisponiveis.length
    };

    // Caso existam equipamentos indisponíveis
    if (equipamentosIndisponiveis.length > 0) {

        resposta.aviso =
            `Empréstimo realizado parcialmente: ${equipamentosDisponiveis.length} de ${equipamentoIds.length} equipamentos disponíveis.`;

        resposta.equipamentosIndisponiveis =
            equipamentosIndisponiveis.map(
                equipamento => ({
                    id: equipamento.id,
                    nome: equipamento.nome,
                    status: equipamento.status
                })
            );
    }

    res.status(201).json(resposta);
}

function devolverEmprestimo(req, res) {

    const id = Number(req.params.id);

    const emprestimo = emprestimos.find(
        emprestimo => emprestimo.id === id
    );

    // Verifica se o empréstimo existe
    if (!emprestimo) {
        return res.status(404).json({
            erro: "Empréstimo não encontrado."
        });
    }

    // Verifica se o empréstimo já foi devolvido
    if (emprestimo.status !== "Ativo") {
        return res.status(400).json({
            erro: "Este empréstimo já foi devolvido."
        });
    }

    // Atualiza o status dos equipamentos
    emprestimo.equipamentoIds.forEach(idEquipamento => {

        const equipamento = equipamentos.find(
            equipamento => equipamento.id === idEquipamento
        );

        if (equipamento) {
            equipamento.status = "Disponível";
        }
    });

    // Atualiza o empréstimo
    emprestimo.status = "Devolvido";

    res.status(200).json(emprestimo);
}

module.exports = {
    listarEmprestimos,
    buscarEmprestimoPorId,
    cadastrarEmprestimo,
    devolverEmprestimo
};