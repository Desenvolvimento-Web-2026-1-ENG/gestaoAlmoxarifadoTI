const { equipamentos } = require("../data/database");

function listarEquipamentos(req, res) {
    res.status(200).json(equipamentos);
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

module.exports = {
    listarEquipamentos,
    buscarEquipamentoPorId
};