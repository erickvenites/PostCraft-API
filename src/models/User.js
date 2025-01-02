const prisma = require("../database");
const bcrypt = require("bcryptjs");

class User {
  static async getAll() {
    return await prisma.user.findMany();
  }

  static async getById(id) {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          include: {
            tags: true,
          },
        },
      },
    });
  }

  static async getByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  static async create({ name, email, password }) {
    // Verificando se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email já em uso");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    return await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });
  }

  static async update(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id) {
    return await prisma.user.delete({
      where: { id },
    });
  }
}

module.exports = User;
