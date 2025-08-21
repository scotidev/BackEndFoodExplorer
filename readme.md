# Food Explorer — API (Backend)

API do projeto Food Explorer, desenvolvida para o bootcamp Explorer (Formação Full Stack) da Rocketseat e concluída em 2024.

## Frontend

- **Link pro App**: [FoodExplorer](https://foodexplorer42.netlify.app/)

## Resumo do Projeto

- **Objetivo**: simular o backend de um restaurante online com autenticação por papéis (admin e customer), gerenciamento de pratos, busca por ingredientes, favoritos e carrinho.
- **Arquitetura**: Node.js + Express, banco SQLite via Knex, autenticação com JWT em cookie HTTP-only e upload de imagens com Multer.
- **Integração**: preparado para consumo pelo frontend hospedado (CORS com credenciais habilitado para o domínio do app).

## Funcionalidades

**Gerais**:

- Login;
- Cadastro de usuários;
- Visualização de Pratos;
- Pesquisa dos pratos por nome e ingredientes;
- Logout.

**Admin**:

- Cadastro, Edição, Exclusão e Visualização de pratos (CRUD);
- Upload e atualização de imagens dos pratos.

**Usuário**:

- Favoritar e desfavoritar pratos;
- Gerenciamento de carrinho (adicionar, atualizar quantidade e remover itens).

## Como rodar localmente

**Pré-requisitos**: Node.js, npm.

1. Instale dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz com, no mínimo:

```bash
AUTH_SECRET=uma_chave_segura
PORT=nome_da_porta
```

3. Execute as migrações do banco:

```bash
npm run migrate
```

4. Inicie em desenvolvimento:

```bash
npm run dev
```

## Banco de Dados

O projeto utiliza **SQLite** com **Knex** como query builder. Já nos arquivos do backend existe um database.db com pratos de amostra.

- **Usuários (`users`)**: registro de clientes e administradores, com papel (`role`) definido como `admin` ou `customer`. Senhas são armazenadas com hash (bcrypt).
- **Pratos (`dishes`)**: catálogo de itens com `title`, `description`, `price`, `category` (food | drink | dessert) e `image` (nome do arquivo salvo em disco).
- **Ingredientes (`ingredients`)**: cada ingrediente pertence a um prato (relação muitos-para-um). Usado também para busca por ingredientes.
- **Favoritos (`favorites`)**: relação entre usuário e prato para marcar como favorito. Há unicidade por par (um mesmo prato não pode ser favoritado duas vezes pelo mesmo usuário); a operação funciona em modo toggle (adiciona/remove).
- **Carrinho (`cart_items`)**: itens que o usuário adicionou ao carrinho, relacionando prato e quantidade. Se o item já existir, a quantidade é somada/atualizada.

## Bibliotecas Utilizadas

- **express**: servidor HTTP e roteamento
- **express-async-errors**: tratamento de erros em rotas assíncronas
- **cors**: configuração de CORS com credenciais
- **cookie-parser**: leitura de cookies (JWT via cookie HTTP-only)
- **jsonwebtoken**: emissão e verificação de tokens JWT
- **bcryptjs**: hash e verificação de senha
- **knex**: query builder SQL
- **sqlite3** e **sqlite**: driver e utilitários para SQLite
- **multer**: upload de arquivos (imagens de pratos)
- **dotenv**: variáveis de ambiente
- **pm2**: execução em produção (process manager)

## Tech Stack

[![My Skills](https://skillicons.dev/icons?i=js,nodejs,express,sqlite)](https://skillicons.dev)
