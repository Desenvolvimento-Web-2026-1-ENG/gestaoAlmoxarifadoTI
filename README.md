# Almoxarifado de TI (Empréstimo de Equipamentos)

## Sobre o Projeto

O **Almoxarifado de TI** é um sistema desenvolvido para realizar o gerenciamento de empréstimos de equipamentos de um laboratório acadêmico, permitindo o controle eficiente de itens como notebooks, projetores, kits de Arduino e demais recursos tecnológicos.

A aplicação tem como objetivo facilitar o processo de cadastro, consulta de disponibilidade, empréstimo e devolução de equipamentos, garantindo maior organização e rastreabilidade dos itens utilizados pelos alunos e técnicos responsáveis.

---

## Objetivo

Desenvolver uma aplicação web capaz de controlar o fluxo de empréstimo de equipamentos de TI, oferecendo:

- Controle de disponibilidade em tempo real;
- Registro seguro de empréstimos e devoluções;
- Atualização automática do status dos equipamentos;
- Redução de conflitos de uso e perdas de materiais;
- Organização do almoxarifado acadêmico.

---

## Perfis de Usuário

### Técnico (Administrador)

Responsável pelo gerenciamento completo do sistema.

### Permissões
- Cadastrar equipamentos;
- Atualizar informações dos itens;
- Registrar empréstimos;
- Registrar devoluções;
- Alterar status dos equipamentos;
- Consultar relatórios e disponibilidade.

---

## Aluno

Usuário responsável pela solicitação e utilização dos equipamentos.

### Permissões
- Consultar equipamentos disponíveis;
- Visualizar histórico de empréstimos;
- Solicitar empréstimos.

---

## Funcionalidades do Sistema

### Cadastro de Equipamentos

O sistema deverá permitir o cadastro de equipamentos contendo informações como:

- Nome do equipamento;
- Número de patrimônio;
- Categoria;
- Descrição;
- Status atual.

### Categorias de exemplo
- Notebook;
- Projetor;
- Kit Arduino;
- Cabo HDMI;
- Monitor.

---

### Consulta de Disponibilidade

Os usuários poderão verificar, em tempo real, quais equipamentos estão:

- Disponíveis;
- Em uso;
- Em manutenção.

---

### Registro de Empréstimos

O sistema deverá registrar:

- Aluno responsável;
- Equipamentos emprestados;
- Data de saída;
- Data prevista para devolução.

### Regra de Negócio

O sistema **não permitirá empréstimos** caso o equipamento esteja com status:

- `Em Uso`
- `Em Manutenção`

---

### Registro de Devoluções

Ao registrar o retorno de um equipamento, o sistema deverá:

- Atualizar automaticamente o status para `Disponível`;
- Registrar a data de devolução;
- Encerrar o empréstimo ativo.

---

## Regras de Negócio

- Cada equipamento possui um único número de patrimônio;
- Um empréstimo pode conter um ou mais equipamentos;
- Equipamentos indisponíveis não podem ser emprestados;
- Apenas técnicos podem registrar devoluções;
- O status do equipamento deve ser atualizado automaticamente conforme o fluxo de uso.

---

## Estrutura Conceitual do Sistema

### Equipamento

Representa os itens disponíveis no almoxarifado.

#### Atributos
- ID
- Nome
- Número de patrimônio
- Categoria
- Status
- Descrição

---

## Aluno

Representa o usuário solicitante do empréstimo.

### Atributos
- ID
- Nome
- Matrícula
- E-mail

---

## Empréstimo

Representa o vínculo entre aluno e equipamentos.

### Atributos
- ID
- Data de saída
- Data prevista de devolução
- Data de devolução
- Status do empréstimo

### Relacionamentos
- Um aluno pode possuir vários empréstimos;
- Um empréstimo pode conter vários equipamentos.

---

## Fluxo Básico do Sistema

1. Técnico cadastra os equipamentos;
2. Aluno consulta disponibilidade;
3. Técnico registra o empréstimo;
4. Sistema altera status do equipamento para `Em Uso`;
5. Aluno devolve o equipamento;
6. Técnico registra devolução;
7. Sistema altera status para `Disponível`.

---

## Tecnologias Sugeridas

### Front-end
- HTML5
- CSS3
- JavaScript
- Bootstrap ou TailwindCSS

### Back-end
- Node.js  
ou
- Java Spring Boot  
ou
- PHP Laravel

### Banco de Dados
- MySQL  
ou
- PostgreSQL

---

## Possíveis Melhorias Futuras

- Sistema de autenticação;
- Dashboard administrativo;
- Relatórios de uso;
- Histórico completo de movimentações;
- Notificações de atraso;
- QR Code para identificação dos equipamentos;
- Reserva antecipada de itens.

---

## Como Executar o Projeto

### Pré-requisitos
- Git instalado;
- Ambiente de desenvolvimento configurado;
- Banco de dados configurado.

### Clonando o Repositório

```bash
git clone https://github.com/seu-usuario/almoxarifado-ti.git
```

### Acessando a pasta do projeto

```bash
cd almoxarifado-ti
```

### Instalando dependências

Exemplo para Node.js:

```bash
npm install
```

### Executando o projeto

```bash
npm run dev
```

---

## Objetivo Acadêmico

Este projeto possui finalidade acadêmica, visando aplicar conceitos de:

- Engenharia de Software;
- Desenvolvimento Web;
- Modelagem de Banco de Dados;
- Programação Orientada a Objetos;
- Controle de acesso e regras de negócio.

---

## Equipe de Desenvolvimento

Projeto desenvolvido para fins acadêmicos por mim, Lucas Severiano, Bacharelando de Engenharia de Computação.

---

## Licença

Este projeto pode ser utilizado para fins educacionais e acadêmicos.
````