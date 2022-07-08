const articlesRouter = require("express").Router();

const {
  getArticleByID,
  patchArticleById,
  getAllArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("../controllers/article_controllers.js");

articlesRouter.get("/", getAllArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId);

module.exports = articlesRouter;
