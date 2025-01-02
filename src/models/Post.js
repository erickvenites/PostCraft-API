const prisma = require("../database");

class Post {
  static async getAll(skip, take) {
    return await prisma.post.findMany({
      skip,
      take,
      orderBy: { createdAt: "desc" },
    });
  }

  static async getById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.post.findUnique({
      where: { id: parsedId },
      include: { author: true, tags: true },
    });
  }

  static async count() {
    return await prisma.post.count();
  }

  static async search(filter) {
    return await prisma.post.findMany({
      where: filter,
      orderBy: { createdAt: "desc" },
    });
  }

  static async create({ title, content, published, authorId, tags }) {
    // Converte os IDs das tags para garantir que elas existam
    const tagRecords = await Promise.all(
      tags.map(async (tagName) => {
        let tag = await prisma.tag.findUnique({
          where: { name: tagName },
        });
        if (!tag) {
          tag = await prisma.tag.create({
            data: { name: tagName },
          });
        }
        return tag;
      })
    );

    return await prisma.post.create({
      data: {
        title,
        content,
        published: published || false,
        authorId: parseInt(authorId, 10),
        tags: {
          connect: tagRecords.map((tag) => ({ id: tag.id })),
        },
      },
    });
  }

  static async update(id, { title, content, published, tags }) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.post.update({
      where: { id: parsedId },
      data: {
        title,
        content,
        published,
        tags: { set: tags.map((tag) => ({ id: tag.id })) }, // Conectando diretamente pelo ID da tag
      },
    });
  }

  static async delete(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.post.delete({
      where: { id: parsedId },
    });
  }
}
module.exports = Post;
