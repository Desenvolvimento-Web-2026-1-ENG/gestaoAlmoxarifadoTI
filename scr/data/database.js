const equipamentos = [
    {
        id: 1,
        patrimonio: "PAT-001",
        nome: "Notebook Dell",
        categoria: "Laptop",
        status: "Disponível"
    },
    {
        id: 2,
        patrimonio: "PAT-002",
        nome: "Projetor Epson",
        categoria: "Projetor",
        status: "Disponível"
    },
    {
        id: 3,
        patrimonio: "PAT-003",
        nome: "Kit Arduino",
        categoria: "Arduino",
        status: "Em Manutenção"
    }
];

const alunos = [];

const emprestimos = [];

module.exports = {
    equipamentos,
    alunos,
    emprestimos
};