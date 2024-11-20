# Food Explorer

API desenvolvida para consumir o backend do projeto Food Explorer, do curso Explorer FullStack da Rocketseat.

## Sobre

Essa API foi construída utilizando como base o NODE.js. Projeto realizado como parte do desafio final do curso Explorer da Rocketseat, simulando uma aplicação de um restaurante online, feito de ponta a ponta, integrando back-end e front-end e consumindo sua própria API. O desenvolvimento desse projeto foi feito exclusivamente com o propósito de concluir o curso Explorer.

## Hospedagem

Essa API será consumida pelo frontend da aplicação que está disponível no seguinte repositório: [Repositório Frontend](https://github.com/gabrielscoti42/FrontEndFoodExplorer)

## Arquitetura

BackEndFoodExplorer/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js

## Banco de Dados

O banco de dados é dividido em 3 tabelas:

- Usuários
- Pratos
- Ingredientes dos pratos

## Funcionalidades

- Login;
- Cadastro de usuários;
- Cadastro, Edição, Exclusão e Visualização de pratos (CRUD) pelo admin;
- Visualização dos pratos por parte do usuário customer;
- Pesquisa dos pratos por nome e ingredientes;
- Logout

## Bibliotecas Utilizadas

- Knex
- CORS
- Dotenv
- Multer
- PM2

## Tecnologias Utilizadas

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,sqlite,express)](https://skillicons.dev)