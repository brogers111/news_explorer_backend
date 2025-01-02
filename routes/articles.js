const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  validateId,
  validateArticleBody,
} = require("../middlewares/validation");
const {
  getSavedArticles,
  saveArticle,
  unsaveArticle,
} = require("../controllers/articles");

router.get("/", auth, getSavedArticles);
router.post("/", auth, validateArticleBody, saveArticle);
router.delete("/:articleId", auth, validateId, unsaveArticle);

module.exports = router;
