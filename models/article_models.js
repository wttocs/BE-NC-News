const db = require("../db/connection");
const { fetchAllTopics } = require("../models/topic_models");
const { fetchAllUsers } = require("./user_models");

// Trello 4
exports.fetchArticleById = (article_id) => {
  let queryString = `SELECT articles.*, COUNT(comments.comment_id)::INT AS comment_count 
    FROM articles 
    LEFT JOIN comments USING (article_id) WHERE articles.article_id = $1 GROUP BY articles.article_id`;
  return db.query(queryString, [article_id]).then(({ rows: article }) => {
    if (!article[0]) {
      return Promise.reject({ status: 404, msg: "Article ID Not Found" });
    } else {
      return article[0];
    }
  });
};
// Trello 5
exports.updateArticleById = (inc_votes, article_id) => {
  if (!inc_votes) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter the correct input",
    });
  }
  if (isNaN(inc_votes)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter a number",
    });
  }
  if (Object.keys(inc_votes).length > 1) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please only enter one input",
    });
  }
  const queryString =
    "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *";
  return db
    .query(queryString, [inc_votes, article_id])
    .then(({ rows: updated_article }) => {
      if (!updated_article[0]) {
        return Promise.reject({
          status: 404,
          msg: "Article ID Not Found",
        });
      } else {
        return updated_article[0];
      }
    });
};

// Trello 8
exports.fetchAllArticles = (sort_by = "created_at", order = "desc", topic) => {
  const validSortBy = [
    "article_id",
    "title",
    "topic",
    "author",
    "body",
    "created_at",
    "votes",
    "comment_count",
  ];
  const validOrder = ["desc", "asc"];
  const queryValues = [];

  let queryString = `
  SELECT 
    articles.article_id,
    articles.title,
    articles.topic,
    articles.author,
    articles.body,
    articles.created_at,
    articles.votes,
  COUNT(comment_id)::int AS comment_count
  FROM articles
  LEFT JOIN comments
  USING (article_id)`;

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter a valid sort_by query",
    });
  }
  if (!validOrder.includes(order)) {
    return Promise.reject({
      status: 400,
      msg: "Invalid Request: Please enter a valid order query",
    });
  }
  if (topic) {
    queryString += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryString += `GROUP BY articles.article_id `;
  queryString += ` ORDER BY ${sort_by} ${order.toUpperCase()}`;

  return db.query(queryString, queryValues).then(({ rows: articles }) => {
    if (!articles[0]) {
      return fetchAllTopics().then((topic) => {
        const allTopics = topic.map((topic) => {
          return topic.slug;
        });
        if (!allTopics.includes(topic)) {
          return Promise.reject({
            status: 400,
            msg: "Bad Request: This topic does not exist",
          });
        }
      });
    } else {
      return articles;
    }
  });
};
exports.fetchCommentsByArticleId = (article_id) => {
  const queryString = `
        SELECT 
        comment_id,
        votes,
        created_at,
        author,
        body,
        article_id
        FROM comments
        WHERE article_id = $1
    `;

  return db.query(queryString, [article_id]).then(({ rows: articles }) => {
    return articles;
  });
};
// Trello 10
exports.insertCommentByArticleId = (article_id, username, body) => {
  if (!body) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid comment",
    });
  }

  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a username",
    });
  }
  if (!body) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid comment",
    });
  }
  if (!username) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a username",
    });
  }
  if (typeof body !== "string" || typeof username !== "string") {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid data type",
    });
  }
  const queryString = `
    INSERT INTO comments
      (article_id, author, body)
    VALUES
      ($1, $2, $3)
    RETURNING *;
    `;

  const queryValues = [article_id, username, body];

  return fetchAllUsers().then((users) => {
    const allUsernames = users.map((user) => {
      return user.username;
    });
    if (!allUsernames.includes(username)) {
      return Promise.reject({
        status: 404,
        msg: "Bad Request: Username does not exist",
      });
    } else {
      return db
        .query(queryString, queryValues)
        .then(({ rows: postedComment }) => {
          return postedComment[0];
        });
    }
  });
};
// Trello 19
exports.insertArticle = (author, title, body, topic) => {
  if (!author || !title || !body || !topic) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter valid article contents",
    });
  }

  if (
    typeof author !== "string" ||
    typeof title !== "string" ||
    typeof body !== "string" ||
    typeof topic !== "string"
  ) {
    return Promise.reject({
      status: 400,
      msg: "Bad Request: Please enter a valid data type",
    });
  }
  const queryString = `INSERT INTO articles (author, title, body, topic) VALUES
    ($1, $2, $3, $4) RETURNING *, 0 as comment_count`;

  const queryValues = [author, title, body, topic];

  return fetchAllUsers().then((users) => {
    const allUsernames = users.map((user) => {
      return user.username;
    });
    if (!allUsernames.includes(author)) {
      return Promise.reject({
        status: 404,
        msg: "Bad Request: Username does not exist",
      });
    } else {
      return db.query(queryString, queryValues).then(({ rows: article }) => {
        // article[0].comment_count = 0;
        return article[0];
      });
    }
  });
};
