# API de Transferências (Node.js + Express)

Esta API permite registro, login, consulta de usuários, marcação de favorecidos e transferência de valores entre usuários. Os dados são armazenados em memória.

## Instalação

1. Clone o repositório:
   ```bash
   git clone <repo-url>
   cd PGATS-02-API
   ```
2. Instale as dependências:
   ```bash
   npm install express swagger-ui-express swagger-jsdoc
   ```

## Como rodar

- Para iniciar o servidor:
  ```bash
  node server.js
  ```
- A API estará disponível em `http://localhost:3000`
- A documentação Swagger estará em `http://localhost:3000/api-docs`

## Endpoints principais

- `POST /register` — Registro de usuário `{ username, password }`
- `POST /login` — Login `{ username, password }`
- `GET /users` — Lista todos os usuários
- `POST /users/favorecido` — Marca um usuário como favorecido `{ userId, favorecidoId }`
- `POST /transfer` — Realiza transferência `{ from, to, amount }`
- `GET /transfers?userId=ID` — Lista transferências de um usuário

## Regras de negócio

- Não é permitido registrar usuários duplicados.
- Login exige usuário e senha.
- Só é possível transferir valores acima de R$ 5.000,00 para favorecidos.
- Dados são voláteis (em memória).

## Testes

- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest.

---

Para dúvidas, consulte a documentação Swagger ou o código-fonte.
