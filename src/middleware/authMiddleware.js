const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRole = null) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Assumindo que o token vem no formato "Bearer <token>"

    if (!token) {
      return res.status(401).json({ error: "Acesso não autorizado" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Armazena os dados do usuário no `req`

      if (requiredRole && req.user.role !== requiredRole) {
        return res.status(403).json({ error: "Acesso proibido" });
      }

      next(); // Continúa para o próximo middleware ou a rota
    } catch (error) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }
  };
};

module.exports = authMiddleware;
