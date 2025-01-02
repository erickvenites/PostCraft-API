# PostCraft API

## Visão Geral

Esta API é projetada para gerenciar recursos relacionados a usuários, posts e tags. Ela oferece endpoints para criar, ler, atualizar e excluir esses recursos, com suporte à paginação, filtração e associações entre entidades.

## Configuração Inicial

### Requisitos:

- Node.js v14+;
- Banco de dados PostgreSQL configurado com Prisma.

### Instalação:

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Configure o arquivo `.env` com a URL do banco de dados:
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/database_name
   ```
4. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
5. Inicie o servidor:
   ```bash
   npm start
   ```

### URL Base

`http://localhost:3000/api`

---

## Endpoints

### Autenticação

#### **Login de Usuário**

**POST** `/api/auth/login`

**Corpo da Requisição:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Resposta:**

```json
{
  "token": "jwt_token_aqui"
}
```

### Usuários (`/users`)

#### **Listar Usuários**

**GET** `/api/users`

**Resposta:**

```json
[
  {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "posts": []
  }
]
```

---

#### **Criar Usuário**

**POST** `/api/users`

**Corpo da Requisição:**

```json
{
  "name": "User Name",
  "email": "user@example.com"
}
```

**Resposta:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name"
}
```

---

#### **Obter Usuário por ID**

**GET** `/api/users/:id`

**Resposta:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "User Name",
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "tags": [{ "id": 1, "name": "Tag Name" }]
    }
  ]
}
```

---

#### **Atualizar Usuário**

**PUT** `/api/users/:id`

**Corpo da Requisição:**

```json
{
  "name": "Updated Name"
}
```

**Resposta:**

```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Updated Name"
}
```

---

#### **Excluir Usuário**

**DELETE** `/api/users/:id`

**Resposta:**

```json
{
  "message": "Usuário excluído com sucesso"
}
```

---

### Posts (`/posts`)

#### **Listar Posts**

**GET** `/api/posts`

**Parâmetros de Query:**

- `page` (opcional): Número da página (padrão: 1).
- `pageSize` (opcional): Tamanho da página (padrão: 10).

**Resposta:**

```json
{
  "result": [
    {
      "id": 1,
      "title": "Post Title",
      "createdAt": "2025-01-01T00:00:00Z",
      "published": false
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalPosts": 50,
    "totalPage": 5
  }
}
```

---

#### **Criar Post**

**POST** `/api/posts`

**Corpo da Requisição:**

```json
{
  "title": "Post Title",
  "content": "Post Content",
  "published": true,
  "authorId": 1,
  "tags": [{ "id": 1 }]
}
```

**Resposta:**

```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post Content",
  "published": true
}
```

---

#### **Obter Post por ID**

**GET** `/api/posts/:id`

**Resposta:**

```json
{
  "id": 1,
  "title": "Post Title",
  "content": "Post Content",
  "author": {
    "id": 1,
    "name": "User Name"
  },
  "tags": [{ "id": 1, "name": "Tag Name" }]
}
```

---

#### **Atualizar Post**

**PUT** `/api/posts/:id`

**Corpo da Requisição:**

```json
{
  "title": "Updated Title",
  "tags": [{ "id": 1 }]
}
```

**Resposta:**

```json
{
  "id": 1,
  "title": "Updated Title",
  "tags": [{ "id": 1, "name": "Tag Name" }]
}
```

---

#### **Excluir Post**

**DELETE** `/api/posts/:id`

**Resposta:**

```json
{
  "message": "Post excluído com sucesso"
}
```

---

### Tags (`/tags`)

#### **Listar Tags**

**GET** `/api/tags`

**Resposta:**

```json
[
  {
    "id": 1,
    "name": "Tag Name"
  }
]
```

---

#### **Criar Tag**

**POST** `/api/tags`

**Corpo da Requisição:**

```json
{
  "name": "Tag Name"
}
```

**Resposta:**

```json
{
  "id": 1,
  "name": "Tag Name"
}
```

---

#### **Obter Tag por ID**

**GET** `/api/tags/:id`

**Resposta:**

```json
{
  "id": 1,
  "name": "Tag Name",
  "posts": [
    {
      "id": 1,
      "title": "Post Title",
      "author": {
        "id": 1,
        "name": "User Name"
      }
    }
  ]
}
```

---

#### **Atualizar Tag**

**PUT** `/api/tags/:id`

**Corpo da Requisição:**

```json
{
  "name": "Updated Tag Name"
}
```

**Resposta:**

```json
{
  "id": 1,
  "name": "Updated Tag Name"
}
```

---

#### **Excluir Tag**

**DELETE** `/api/tags/:id`

**Resposta:**

```json
{
  "message": "Tag excluída com sucesso"
}
```

---

## Tratamento de Erros

**Formato de erro:**

```json
{
  "error": "Mensagem de erro",
  "details": "Detalhes adicionais sobre o erro"
}
```

---

## Middleware Globais

- **404**: Retorna uma mensagem amigável caso a rota não seja encontrada.
- **500**: Captura erros internos e exibe uma mensagem genérica.

---

## Melhorias Futuras

- Testes automatizados.
- Cache para melhoria de desempenho.
