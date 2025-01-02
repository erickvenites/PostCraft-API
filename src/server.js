const express = require("express");
const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");
const tagsRouter = require("./routes/tags");
const authRouter = require("./routes/auth");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rotas da API
app.use("/api", authRouter);
app.use("/api", usersRouter);
app.use("/api", postsRouter);
app.use("/api", tagsRouter);

// Middleware para tratar rotas não encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
  console.error("Erro:", err.message);
  res
    .status(err.status || 500)
    .json({ error: "Erro interno do servidor", details: err.message });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
