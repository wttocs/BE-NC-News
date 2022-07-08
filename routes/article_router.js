const articlesRouter = require("express").Router();

const {
  getArticleByID,
  patchArticleById,
  getAllArticles,
  getCommentsByArticleId,
  postCommentByArticleId,
  postArticle,
  deleteArticleById,
} = require("../controllers/article_controllers.js");

articlesRouter.route("/").get(getAllArticles).post(postArticle);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(patchArticleById)
  .delete(deleteArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
