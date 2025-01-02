const prisma = require("../database");

class Tag {
  static async getAll() {
    return await prisma.tag.findMany();
  }

  static async getById(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.tag.findUnique({
      where: { id: parsedId },
      include: {
        posts: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  static async create(name) {
    return await prisma.tag.create({
      data: { name },
    });
  }

  static async update(id, name) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.tag.update({
      where: { id: parsedId },
      data: { name },
    });
  }

  static async delete(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) throw new Error("ID inválido");

    return await prisma.tag.delete({
      where: { id: parsedId },
    });
  }
}

module.exports = Tag;
