const express = require("express");

const cors = require("cors");

const equipamentoRoutes = require("./scr/routes/equipamentoRoutes");

const alunoRoutes = require("./scr/routes/alunoRoutes");

const emprestimoRoutes = require("./scr/routes/emprestimoRoutes");

const errorHandler = require("./scr/middlewares/errorHandler");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/equipamentos", equipamentoRoutes);

app.use("/alunos", alunoRoutes);

app.use("/emprestimos", emprestimoRoutes);

const PORT = 3000;

app.get("/", (req, res) => {
    res.status(200).json({
        mensagem: "API do Almoxarifado de TI funcionando!"
    });
});

app.use((req, res) => {
    res.status(404).json({
        erro: "Rota não encontrada."
    });
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});