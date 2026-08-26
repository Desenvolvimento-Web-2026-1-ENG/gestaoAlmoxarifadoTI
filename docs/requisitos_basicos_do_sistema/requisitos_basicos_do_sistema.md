# Requisitos Básicos — Sistema de Almoxarifado de TI

## 1. Objetivo do Sistema

O sistema tem como objetivo gerenciar o empréstimo de equipamentos de um almoxarifado de TI, permitindo o controle de disponibilidade, empréstimos, devoluções e status dos equipamentos.

---

# 2. Perfis de Usuário

## Técnico (Administrador)

Responsável pelo gerenciamento do sistema e dos equipamentos.

### Permissões
- Cadastrar equipamentos;
- Atualizar status dos equipamentos;
- Registrar empréstimos;
- Registrar devoluções;
- Consultar equipamentos e empréstimos.

---

## Aluno

Usuário que realiza empréstimos de equipamentos.

### Permissões
- Consultar disponibilidade de equipamentos;
- Solicitar empréstimos;
- Consultar seus empréstimos.

---

# 3. Requisitos Funcionais

## RF01 — Cadastro de Equipamentos

O sistema deve permitir que o técnico cadastre equipamentos contendo:
- Nome;
- Número de patrimônio;
- Categoria;
- Status do equipamento.

---

## RF02 — Consulta de Disponibilidade

O sistema deve permitir a consulta da disponibilidade dos equipamentos em tempo real.

---

## RF03 — Registro de Empréstimo

O sistema deve permitir registrar empréstimos vinculando:
- Um aluno;
- Um ou mais equipamentos;
- Data de saída;
- Data prevista para devolução.

---

## RF04 — Validação de Disponibilidade

O sistema deve impedir o empréstimo de equipamentos que estejam:
- EM_USO;
- EM_MANUTENÇÃO.

---

## RF05 — Atualização Automática de Status

Ao realizar um empréstimo:
- O status do equipamento deve ser alterado para `Em_USO`.

Ao registrar uma devolução:
- O status deve retornar para `DISPONÍVEL`.

---

## RF06 — Registro de Devolução

O sistema deve permitir registrar o retorno dos equipamentos emprestados.

---

## RF07 — Controle de Status

O sistema deve permitir os seguintes status para equipamentos:
- `DISPONÍVEL`;
- `EM_USO`;
- `EM_MANUTENÇÃO`.

---

## RF08 — Histórico de Empréstimos

O sistema deve armazenar o histórico de empréstimos realizados.

---

# 4. Requisitos Não Funcionais

## RNF01 — Interface

O sistema deve possuir interface simples e intuitiva.

---

## RNF02 — Desempenho

A consulta de disponibilidade deve ocorrer em tempo real.

---

## RNF03 — Segurança

O acesso ao sistema deve exigir autenticação de usuário.

---

## RNF04 — Integridade

O sistema não deve permitir empréstimos duplicados para o mesmo equipamento simultaneamente.

---

## RNF05 — Compatibilidade

O sistema deve funcionar em navegadores web modernos.

---

# 5. Regras de Negócio

## RN01

Um equipamento só poderá ser emprestado se estiver com status `DISPONÍVEL`.

---

## RN02

Todo empréstimo deve estar vinculado a um aluno cadastrado.

---

## RN03

Um empréstimo pode conter um ou mais equipamentos.

---

## RN04

A devolução de todos os itens do empréstimo deve atualizar automaticamente seus status para `DISPONÍVEL`.

---

## RN05

Somente técnicos podem cadastrar equipamentos e alterar status manualmente.