const User = require("../models/User");

class UserController {
  static parseId(id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      throw new Error("Invalid ID format");
    }
    return parsedId;
  }

  async listUsers(req, res) {
    try {
      const users = await User.getAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async createUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    try {
      const newUser = await User.create({ name, email, password });
      res.status(201).json(newUser);
    } catch (error) {
      if (error.message === "Email already in use") {
        return res.status(400).json({ error: error.message });
      }
      res
        .status(500)
        .json({ error: "Failed to create user", details: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const id = UserController.parseId(req.params.id);
      const user = await User.getById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async updateUser(req, res) {
    try {
      const id = UserController.parseId(req.params.id);
      const data = req.body;

      const updatedUser = await User.update(id, data);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async deleteUser(req, res) {
    try {
      const id = UserController.parseId(req.params.id);
      const deletedUser = await User.delete(id);
      res
        .status(200)
        .json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}

module.exports = new UserController();
