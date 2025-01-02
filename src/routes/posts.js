const { Router } = require("express");
const postController = require("../controllers/PostController");
const authMiddleware = require("../middleware/authMiddleware");

const postsRouter = Router();

postsRouter.get("/posts", postController.listPosts);
postsRouter.get("/posts/search", postController.search);
postsRouter.get("/posts/:id", postController.getPostById);

postsRouter.post("/posts", authMiddleware(), postController.createPost);
postsRouter.put("/posts/:id", authMiddleware(), postController.updatePost);
postsRouter.delete("/posts/:id", authMiddleware(), postController.deletePost);

module.exports = postsRouter;
