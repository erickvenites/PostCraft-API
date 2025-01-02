const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Verificar se o usuário existe
      const user = await User.getByEmail(email);
      if (!user) {
        return res.status(400).json({ error: "Email ou senha incorretos" });
      }

      // Verificar a senha
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Email ou senha incorretos" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Erro ao realizar login", details: error.message });
    }
  }
}

module.exports = new AuthController();
