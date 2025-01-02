const Tag = require("../models/Tag");

class TagController {
  // Listar todas as tags
  async listTags(req, res) {
    try {
      const tags = await Tag.getAll();
      res.json(tags);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao listar tags", details: error.message });
    }
  }

  // Obter tag por ID
  async getTagById(req, res) {
    try {
      const { id } = req.params;
      const tag = await Tag.getById(id);
      if (!tag) return res.status(404).json({ error: "Tag não encontrada" });
      res.json(tag);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao obter tag", details: error.message });
    }
  }

  // Criar nova tag
  async createTag(req, res) {
    try {
      const { name } = req.body;
      if (!name)
        return res.status(400).json({ error: "O campo 'name' é obrigatório" });
      const newTag = await Tag.create(name);
      res.status(201).json(newTag);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao criar tag", details: error.message });
    }
  }

  // Atualizar tag
  async updateTag(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      if (!name)
        return res
          .status(400)
          .json({ error: "O campo 'name' é obrigatório para atualização" });
      const updatedTag = await Tag.update(id, name);
      res.json(updatedTag);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao atualizar tag", details: error.message });
    }
  }

  // Deletar tag
  async deleteTag(req, res) {
    try {
      const { id } = req.params;
      await Tag.delete(id);
      res.json({ message: "Tag deletada com sucesso" });
    } catch (error) {
      res
        .status(400)
        .json({ error: "Erro ao deletar tag", details: error.message });
    }
  }
}

module.exports = new TagController();
