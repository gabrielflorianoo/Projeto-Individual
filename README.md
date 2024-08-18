# Projeto Web-Backend - UTFPR

Este projeto foi desenvolvido como parte da disciplina de Programação Web-Backend na Universidade Tecnológica Federal do Paraná (UTFPR). O objetivo do projeto é criar uma API RESTful para gerenciar usuários, produtos e pedidos, com autenticação e autorização.

## Funcionalidades

- **Gerenciamento de Usuários:**
  - Cadastro e autenticação de usuários.
  - Gerenciamento de administradores e permissões de acesso.

- **Gerenciamento de Produtos:**
  - Criação, listagem, atualização e exclusão de produtos.
  - Associação de produtos a usuários.

- **Gerenciamento de Pedidos:**
  - Criação de pedidos associando usuários a produtos.
  - Controle de quantidade de produtos em cada pedido.

- **Documentação da API:**
  - Documentação interativa utilizando Swagger disponível em `/docs`.

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **Express:** Framework web para Node.js, utilizado para criar a API.
- **Sequelize:** ORM para manipulação do banco de dados.
- **Swagger:** Ferramenta para documentação da API.
- **MySQL:** Banco de dados relacional utilizado no projeto.
- **dotenv:** Gerenciamento de variáveis de ambiente.

## Estrutura do Projeto

- `app.js`: Arquivo principal que configura e inicia o servidor Express, define as rotas e middlewares.
- `routes/`: Pasta que contém os arquivos de rotas, responsáveis por definir os endpoints da API.
- `models/`: Pasta que contém os modelos Sequelize, definindo as tabelas e relações do banco de dados.
- `swagger.json`: Arquivo de configuração do Swagger para documentação da API.

## Rotas da API

- `/`: Rota principal do projeto.
- `/login`: Rota para autenticação de usuários.
- `/users`: Rota para gerenciamento de usuários.
- `/admin`: Rota para funções administrativas.
- `/products`: Rota para gerenciamento de produtos.
- `/orders`: Rota para gerenciamento de pedidos.
- `/docs`: Rota para acessar a documentação da API via Swagger.
- `/install`: Rota para receber o código de criação do banco de dados mysql 

## Instalação e Execução

### Requisitos

- Node.js (versão 14 ou superior)
- MySQL

### Passos para executar o projeto

1. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
npm install
```

#### Edite as variáveis de ambiente

```bash
DB_HOST=localhost
DB_USER=seu-usuario
DB_PASS=sua-senha
DB_NAME=nome-do-banco
```

#### Rode o código

```bash
npm start
```
