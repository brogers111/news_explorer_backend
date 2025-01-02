const mongoose = require("mongoose");
const Article = require("../models/article");
const { BadRequestError, NotFoundError, ForbiddenError } = require("../utils/errors");

// GET /articles
const getSavedArticles = (req, res, next) => {
  Article.find({})
    .then((article) => res.status(200).send(article))
    .catch(next);
};

// POST /articles
const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user._id;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => res.status(201).send(article))
    .catch((err) => {
      const error = new Error(err.message);
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided for article saving"));
      }
      next(error);
    });
};

// DELETE /articles/:articleId
const unsaveArticle = (req, res, next) => {
  const { articleId } = req.params;
  const { _id: userId } = req.user;

  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    return next(new BadRequestError("Invalid article ID format"));
  }

  return Article.findById(articleId)
    .orFail(() => new NotFoundError("Article not found"))
    .then((article) => {
      if (article.owner.toString() !== userId) {
        throw new ForbiddenError("You are not authorized to unsave this article");
      }

      return Article.findByIdAndDelete(articleId).then(() =>
        res.status(200).send({ message: "Article successfully unsaved" })
      );
    })
    .catch(next);
};

module.exports = { getSavedArticles, saveArticle, unsaveArticle };