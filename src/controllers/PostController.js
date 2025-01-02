const Post = require("../models/Post");

class PostController {
  static parseId(id) {
    const parsed = parseInt(id, 10);
    if (isNaN(parsed)) throw new Error("ID inválido");
    return parsed;
  }

  async listPosts(req, res) {
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const pageSize = parseInt(req.query.pageSize, 10) || 10;

      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const result = await Post.getAll(skip, take);
      const totalPosts = await Post.count();
      const totalPage = Math.ceil(totalPosts / pageSize);

      res.json({
        result,
        pagination: { page, pageSize, totalPosts, totalPage },
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar posts", details: error.message });
    }
  }

  async getPostById(req, res) {
    try {
      console.log("ID recebido:", req.params.id); // Log para depuração
      const id = PostController.parseId(req.params.id);
      const result = await Post.getById(id);
      if (!result)
        return res.status(404).json({ error: "Post não encontrado" });

      res.json(result);
    } catch (error) {
      console.error("Erro ao obter post:", error); // Log do erro
      res
        .status(400)
        .json({ error: "Erro ao obter post", details: error.message });
    }
  }

  async search(req, res) {
    try {
      const filters = req.query; // Recebe todos os parâmetros da query string
      const filter = {}; // Objeto de filtro vazio

      // Verifica e constrói o filtro dinâmico
      if (filters.title)
        filter.title = { contains: filters.title, mode: "insensitive" };
      if (filters.content)
        filter.content = { contains: filters.content, mode: "insensitive" };
      if (filters.published) filter.published = filters.published === "true";
      if (filters.authorId) filter.authorId = parseInt(filters.authorId, 10); // Garantir que o ID do autor seja um número
      if (filters.startDate || filters.endDate) {
        filter.createdAt = {};
        if (filters.startDate)
          filter.createdAt.gte = new Date(filters.startDate);
        if (filters.endDate) filter.createdAt.lte = new Date(filters.endDate);
      }

      // Filtro por tags, se fornecido
      if (filters.tags) {
        filter.tags = {
          some: {
            name: { contains: filters.tags, mode: "insensitive" }, // Supondo que você tem a relação entre Post e Tag
          },
        };
      }

      const posts = await Post.search(filter);
      res.json(posts);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao filtrar posts", details: error.message });
    }
  }

  async createPost(req, res) {
    try {
      const { title, content, published, authorId, tags } = req.body;

      if (!title || !content || !authorId) {
        return res
          .status(400)
          .json({ error: "Campos obrigatórios: title, content, authorId" });
      }

      const newPost = await Post.create({
        title,
        content,
        published,
        authorId,
        tags,
      });
      res.status(201).json(newPost);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao criar post", details: error.message });
    }
  }

  async updatePost(req, res) {
    try {
      const id = PostController.parseId(req.params.id);
      const { title, content, published, tags } = req.body;

      const updatedPost = await Post.update(id, {
        title,
        content,
        published,
        tags,
      });
      res.json(updatedPost);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao atualizar post", details: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const id = PostController.parseId(req.params.id);
      await Post.delete(id);
      res.json({ message: "Post deletado com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao deletar post", details: error.message });
    }
  }
}

module.exports = new PostController();
