const { equipamentos } = require("../data/database");

// Função para normalizar textos
function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

function listarEquipamentos(req, res) {

    const { status, categoria } = req.query;

    let resultado = equipamentos;

    // Filtro por status
    if (status) {
        resultado = resultado.filter(
            equipamento =>
                normalizarTexto(equipamento.status) ===
                normalizarTexto(status)
        );
    }

    // Filtro por categoria
    if (categoria) {
        resultado = resultado.filter(
            equipamento =>
                normalizarTexto(equipamento.categoria) ===
                normalizarTexto(categoria)
        );
    }

    res.status(200).json(resultado);
}

function buscarEquipamentoPorId(req, res) {

    const id = Number(req.params.id);

    const equipamento = equipamentos.find(
        equipamento => equipamento.id === id
    );

    if (!equipamento) {
        return res.status(404).json({
            erro: "Equipamento não encontrado."
        });
    }

    res.status(200).json(equipamento);
}

function cadastrarEquipamento(req, res) {

    const {
        patrimonio,
        nome,
        categoria
    } = req.body;

    if (!patrimonio || !nome || !categoria) {
        return res.status(400).json({
            erro: "Patrimônio, nome e categoria são obrigatórios."
        });
    }

    const patrimonioExiste = equipamentos.some(
        equipamento => equipamento.patrimonio === patrimonio
    );

    if (patrimonioExiste) {
        return res.status(400).json({
            erro: "Patrimônio já cadastrado."
        });
    }

    const novoEquipamento = {
        id: equipamentos.length + 1,
        patrimonio,
        nome,
        categoria,
        status: "Disponível"
    };

    equipamentos.push(novoEquipamento);

    res.status(201).json(novoEquipamento);
}

function atualizarEquipamento(req, res) {

    const id = Number(req.params.id);

    const equipamento = equipamentos.find(
        equipamento => equipamento.id === id
    );

    if (!equipamento) {
        return res.status(404).json({
            erro: "Equipamento não encontrado."
        });
    }

    const {
        patrimonio,
        nome,
        categoria,
        status
    } = req.body;

    if (!patrimonio || !nome || !categoria || !status) {
        return res.status(400).json({
            erro: "Patrimônio, nome, categoria e status são obrigatórios."
        });
    }

    const patrimonioExiste = equipamentos.some(
        equipamento =>
            equipamento.patrimonio === patrimonio &&
            equipamento.id !== id
    );

    if (patrimonioExiste) {
        return res.status(400).json({
            erro: "Patrimônio já cadastrado."
        });
    }

    equipamento.patrimonio = patrimonio;
    equipamento.nome = nome;
    equipamento.categoria = categoria;
    equipamento.status = status;

    res.status(200).json(equipamento);
}

function excluirEquipamento(req, res) {

    const id = Number(req.params.id);

    const index = equipamentos.findIndex(
        equipamento => equipamento.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            erro: "Equipamento não encontrado."
        });
    }

    equipamentos.splice(index, 1);

    res.status(204).send();
}


module.exports = {
    listarEquipamentos,
    buscarEquipamentoPorId,
    cadastrarEquipamento,
    atualizarEquipamento,
    excluirEquipamento
};