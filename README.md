# Almoxarifado de TI — Sistema de Empréstimo de Equipamentos

Sistema web (API REST) para gerenciamento de empréstimos de equipamentos de TI (notebooks, projetores, kits de Arduino, etc.) de um laboratório acadêmico, com controle de disponibilidade, empréstimos e devoluções.

> Projeto acadêmico — Avaliação Parcial (P1) de Desenvolvimento Web.
> Tema: **Gestão de Almoxarifado de TI**.

![Dashboard](docs/assets/screen04.png)

---

## Descrição

O sistema permite que um **Técnico (Admin)** cadastre equipamentos e gerencie empréstimos, e que **Alunos** consultem a disponibilidade de itens e tenham empréstimos registrados em seu nome.

A regra de negócio central: **um equipamento só pode ser emprestado se estiver com status `Disponível`**. Itens `Em Uso` ou `Em Manutenção` não podem ser emprestados novamente até serem liberados.

## Perfis de Usuário

| Perfil | Permissões |
|---|---|
| **Técnico (Admin)** | Cadastrar/editar/excluir equipamentos e alunos, registrar empréstimos e devoluções |
| **Aluno** | Consultar disponibilidade de equipamentos, ter empréstimos registrados em seu nome |

## Regras de Negócio

- Um equipamento só pode ser emprestado se estiver com status `Disponível`.
- Ao registrar um empréstimo, o status do(s) equipamento(s) muda automaticamente para `Em Uso`.
- Ao registrar uma devolução, o status volta automaticamente para `Disponível`.
- Um empréstimo pode conter um ou mais equipamentos, vinculados a um único aluno.
- Cada equipamento possui um número de patrimônio único.
- Se, dentre os equipamentos pedidos num empréstimo, um ou mais estiverem indisponíveis, o empréstimo é criado apenas com os itens disponíveis e a API retorna um aviso listando os indisponíveis.

## Entidades

- **Equipamento**: `id`, `patrimonio`, `nome`, `categoria`, `status` (`Disponível` | `Em Uso` | `Em Manutenção`)
- **Aluno**: `id`, `nome`, `matricula`, `curso`
- **Empréstimo**: `id`, `alunoId`, `equipamentoIds[]`, `dataEmprestimo`, `dataDevolucaoPrevista`, `status` (`Ativo` | `Devolvido`)

---

## Tecnologias

- **Node.js** + **Express** (API REST)
- Armazenamento em memória (arrays JS, em `src/data/database.js`) — sem banco de dados persistente nesta etapa
- **Postman** para documentação/testes dos endpoints

## Estrutura do Projeto

```
gestaoAlmoxarifadoTI/
├── index.js                          # ponto de entrada da API
├── src/
│   ├── controllers/                  # regras de negócio de cada recurso
│   │   ├── alunoController.js
│   │   ├── equipamentoController.js
│   │   └── emprestimoController.js
│   ├── routes/                       # definição das rotas Express
│   │   ├── alunoRoutes.js
│   │   ├── equipamentoRoutes.js
│   │   └── emprestimoRoutes.js
│   └── data/
│       └── database.js               # "banco" em memória
├── docs/
│   ├── wireframe/wireframe.md        # wireframes + mapeamento wireframe↔API
│   ├── requisitos_basicos_do_sistema/
│   ├── diagrama_de_classes/
│   └── assets/                       # imagens dos wireframes
└── Postman/
    ├── GestaoAlmoxarifadoTI-API.postman_collectionAtualizado.json
    └──GestaoAlmoxarifadoTI-APIRunResults.postman_test_run.json
```

---

## Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (recomendado v18+)

### Passo a passo

```bash
# 1. Clone o repositório
git clone https://github.com/Desenvolvimento-Web-2026-1-ENG/gestaoAlmoxarifadoTI.git

# 2. Acesse a pasta do projeto
cd gestaoAlmoxarifadoTI

# 3. Instale as dependências
npm install
npm install express

# 4. Inicie o servidor
npm start
# ou, em modo desenvolvimento (com reload automático via nodemon):
npm run dev
```

A API sobe em **http://localhost:3000**.

```bash
curl http://localhost:3000/
# {"mensagem":"API do Almoxarifado de TI funcionando!"}
```

---

## Documentação da API

> Uma collection completa do Postman (com exemplos de request/response) está em [`Postman/AlmoxarifadoTI.postman_collectionatualizado.json`](Postman/AlmoxarifadoTI.postman_collectionatualizado.json).

Todas as rotas abaixo aceitam/retornam `Content-Type: application/json`.

### Equipamentos — `/equipamentos`

| Verbo | Rota | Descrição |
|---|---|---|
| GET | `/equipamentos` | Lista todos os equipamentos |
| GET | `/equipamentos/:id` | Busca um equipamento pelo `id` |
| POST | `/equipamentos` | Cadastra um novo equipamento |
| PUT | `/equipamentos/:id` | Atualiza um equipamento existente |
| DELETE | `/equipamentos/:id` | Remove um equipamento |

**POST /equipamentos** — body:
```json
{
  "patrimonio": "PAT-004",
  "nome": "Notebook Lenovo",
  "categoria": "Laptop"
}
```
Resposta `201 Created`:
```json
{ "id": 4, "patrimonio": "PAT-004", "nome": "Notebook Lenovo", "categoria": "Laptop", "status": "Disponível" }
```
Erros: `400` (campo obrigatório faltando ou patrimônio duplicado), `404` (id inexistente em GET/PUT/DELETE).

### Alunos — `/alunos`

| Verbo | Rota | Descrição |
|---|---|---|
| GET | `/alunos` | Lista alunos (filtros opcionais via query: `?nome=` e `?curso=`) |
| GET | `/alunos/:id` | Busca um aluno pelo `id` |
| POST | `/alunos` | Cadastra um novo aluno |
| PUT | `/alunos/:id` | Atualiza um aluno existente |
| DELETE | `/alunos/:id` | Remove um aluno |

**POST /alunos** — body:
```json
{ "nome": "Maria Silva", "matricula": "202311250099", "curso": "Engenharia de Computação" }
```
Resposta `201 Created`: o objeto do aluno criado, com `id`.
Erros: `400` (campo obrigatório faltando ou nome duplicado), `404` (id inexistente).

### Empréstimos — `/emprestimos`

| Verbo | Rota | Descrição |
|---|---|---|
| GET | `/emprestimos` | Lista empréstimos (filtros opcionais: `?status=Ativo` e `?alunoId=`) |
| GET | `/emprestimos/:id` | Busca um empréstimo pelo `id` |
| POST | `/emprestimos` | Registra um novo empréstimo |
| PUT | `/emprestimos/:id` | Registra a devolução do empréstimo |

**POST /emprestimos** — body:
```json
{ "alunoId": 1, "equipamentoIds": [1, 2], "dataDevolucaoPrevista": "2026-09-10" }
```
Resposta `201 Created`:
```json
{
  "mensagem": "Empréstimo realizado com sucesso.",
  "emprestimo": { "id": 1, "alunoId": 1, "equipamentoIds": [1, 2], "dataEmprestimo": "26-08-2026", "dataDevolucaoPrevista": "2026-09-10", "status": "Ativo" },
  "quantidadeSolicitada": 2,
  "quantidadeEmprestada": 2
}
```
Se algum item pedido estiver indisponível, a resposta inclui `aviso` e `equipamentosIndisponiveis`, e o empréstimo é criado só com os itens disponíveis. Se **nenhum** item estiver disponível: `400`.

**PUT /emprestimos/:id** (devolução) — sem body. Resposta `200 OK` com o empréstimo atualizado (`status: "Devolvido"`) e os equipamentos voltando para `Disponível`.
Erros: `404` (empréstimo não encontrado), `400` (empréstimo já devolvido).

---

## Wireframes

Protótipos de baixa/média fidelidade das telas principais (Dashboard, Inventário, Registro de Empréstimo, Devoluções) e o **mapeamento de cada componente para o endpoint correspondente** estão documentados em [`docs/wireframe/wireframe.md`](docs/wireframe/wireframe.md).

## Requisitos e Diagrama de Classes

- [Requisitos básicos do sistema](docs/requisitos_basicos_do_sistema/requisitos_basicos_do_sistema.md)
- [Diagrama de Classes](docs/diagrama_de_classes/Diagrama%20de%20Classes%20-%20Almoxarifado%20de%20TI.drawio.png)

---

## Melhorias Futuras (fora do escopo da P1)

- Persistência em banco de dados (MySQL/PostgreSQL)
- Autenticação e autorização por perfil (Técnico x Aluno)
- Front-end consumindo a API (HTML/CSS/JS)
- Histórico completo de movimentações e notificações de atraso

---

## Autor

Projeto desenvolvido para fins acadêmicos por **Lucas Severiano**, graduando em Engenharia de Computação.

## Licença

Este projeto pode ser utilizado para fins educacionais e acadêmicos.