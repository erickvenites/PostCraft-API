const { Router } = require("express");
const tagController = require("../controllers/TagController");
const authMiddleware = require("../middleware/authMiddleware");

const tagsRouter = Router();

tagsRouter.get("/tags", tagController.listTags);
tagsRouter.get("/tags/:id", tagController.getTagById);
tagsRouter.post("/tags", authMiddleware(), tagController.createTag);
tagsRouter.put("/tags/:id", authMiddleware(), tagController.updateTag);
tagsRouter.delete("/tags/:id", authMiddleware(), tagController.deleteTag);

module.exports = tagsRouter;
