const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
require("jest-sorted");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

// Trello 3 Question tests - Happy paths
describe("GET /api/topics", () => {
  test("200: Responds with an array of topic objects with each having the slug and description properties", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body: { topics } }) => {
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            slug: expect.any(String),
            description: expect.any(String),
          });
        });
      });
  });
});
// Trello 3 Question tests - Sad paths
describe("GET /api/topics - Error Handling", () => {
  test("404: Responds with a error message of 'Not Found' for an invalid get request path", () => {
    return request(app)
      .get("/api/notatopic")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Not Found");
      });
  });
});
// Trello 4 Question tests - Happy paths
describe("GET /api/articles/:articleid", () => {
  test("200: Responds with an objects array containing author(which is username from the users table),title, article_id, body, topic, created_at and votes", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
          })
        );
      });
  });
});
// Trello 4 Question tests - Sad path
describe("GET /api/articles/:articleid - Error Handling", () => {
  test("400: Responds with 'Bad request' error message for an invalid get request path", () => {
    return request(app)
      .get("/api/articles/badPath")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Bad Request");
      });
  });
  test("404: Responds with 'Article ID Not Found' error message for an invalid id that does not exist", () => {
    return request(app)
      .get("/api/articles/1000")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Article ID Not Found");
      });
  });
});
// Trello 5 Question tests - Happy paths
describe("PATCH /api/articles/:article_id", () => {
  test("200: Responds with an articles object with the votes updated correctly", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 100 })
      .expect(200)
      .then(({ body: { updated_article } }) => {
        expect(updated_article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 200,
          })
        );
      });
  });
});
// Trello 5 Question tests - Sad paths
describe("PATCH /api/articles/:article_id - Error Handling", () => {
  test("404: Responds with 'Article ID Not Found' error message for an invalid id that does not exist", () => {
    return request(app)
      .patch("/api/articles/500")
      .send({ inc_votes: 100 })
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Article ID Not Found");
      });
  });
  test("400: Responds with 'Bad request' error message for an invalid patch request path", () => {
    return request(app)
      .patch("/api/articles/badpath")
      .send({ inc_votes: 100 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Bad Request");
      });
  });
  test("400, Responds with 'Invalid Request' error message when passed an object that does not have a 'inc_votes' property", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ not_inc_votes: 200 })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Request: Please enter the correct input");
      });
  });
  test("400, Responds with 'Invalid Request' error message when passed an object that does  have a 'inc_votes' property with the incorrect value - PostgreSQL Error Handler", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "dog" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Request: Please enter a number");
      });
  });
  test("400, Responds with 'Invalid Request' error message when passed an object that does have a 'inc_votes' property but also includes an additional incorrect property", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: "100", down_votes: "200" })
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Invalid Request: Please only enter one input");
      });
  });
});
// Trello 6 Question tests - Happy path
describe("GET /api/users", () => {
  test("200: Responds with an array of users objects with each having the username, name and avatar_url properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body: { users } }) => {
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String),
          });
        });
      });
  });
});
// Trello 6 Question tests - Sad path
describe("GET /api/topics - Error Handling", () => {
  test("404: Responds with a error message of 'Not Found' for an invalid get request path", () => {
    return request(app)
      .get("/api/userpath")
      .expect(404)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual("Not Found");
      });
  });
});
// Trello 7 Question tests - Happy path
describe("GET /api/articles/:articleid (comment_count)", () => {
  test("200: Responds with an objects array containing author(which is username from the users table),title, article_id, body, topic, created_at, votes and comment count", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body: { article } }) => {
        expect(article).toEqual(
          expect.objectContaining({
            article_id: 1,
            title: "Living in the shadow of a great man",
            topic: "mitch",
            author: "butter_bridge",
            body: "I find this existence challenging",
            created_at: "2020-07-09T20:11:00.000Z",
            votes: 100,
            comment_count: 11,
          })
        );
      });
  });
});
// Trello 8 Question tests - Happy paths
describe("GET /api/articles/", () => {
  test("200: Responds with an articles object sorted by the creation date in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted("created_at", { descending: true });
        articles.forEach((article) => {
          expect(article).toEqual(
            expect.objectContaining({
              article_id: expect.any(Number),
              title: expect.any(String),
              topic: expect.any(String),
              author: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(Number),
            })
          );
        });
      });
  });
  test("200: Responds with an articles object sorted by the creation date in descending order", () => {
    return request(app)
      .get("/api/articles?sort_by=title&order=desc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeSorted("title", { descending: true });
      });
  });
  test("200: Responds with an articles object sorted by votes in ascending order", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=asc")
      .expect(200)
      .then(({ body: { articles } }) => {
        expect(articles).toBeInstanceOf(Array);
        expect(articles).toHaveLength(12);
        expect(articles).toBeSorted("votes", { ascending: true });
      });
  });
});
// Trello 8 Question tests - Sad paths
describe("GET /api/articles/ - Error Handling", () => {
  test("400: Responds with Invalid Request: Please enter a valid sort by or order error message for an invalid sort by query - PostgreSQL Error Handler", () => {
    return request(app)
      .get("/api/articles?sort_by=notaquery")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual(
          "Invalid Request: Please enter a valid sort_by query"
        );
      });
  });
  test("400: Responds with 'Invalid Request: Please enter a valid sort by or order' error message for an invalid order query - PostgreSQL Error Handler", () => {
    return request(app)
      .get("/api/articles?sort_by=votes&order=notanorder")
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toEqual(
          "Invalid Request: Please enter a valid order query"
        );
      });
  });
});

// Trello 10 Question tests - happy paths
describe("GET /api/articles/:article_id/comments", () => {
  test("201: Creates a new comment and responds with the inserted comment", () => {
    const comment = { username: "butter_bridge", body: "a_test_comment" };
    return request(app)
      .post("/api/articles/1/comments")
      .send(comment)
      .then(({ body: { postedComment } }) => {
        expect(postedComment).toEqual(
          expect.objectContaining({
            comment_id: 19,
            article_id: 1,
            author: "butter_bridge",
            body: "a_test_comment",
            created_at: expect.any(String),
            votes: 0,
          })
        );
      });
  });
});
// // Trello 10 Question tests - Sad paths
describe("GET /api/articles/:article_id/comments - Error Handling", () => {
  test("400: Responds with 'Bad Request' error message when path is invalid", () => {
    const newComment = {
      username: "butter_bridge",
      body: "a_test_comment",
    };
    return request(app)
      .post("/api/articles/notanid/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request");
      });
  });
  test("400: Responds with 'Bad Request: Please enter a username' error message when the comment contains no body", () => {
    const newComment = {
      username: "",
      body: "this_is_a_comment",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request: Please enter a username");
      });
  });
  test("400: Responds with 'Bad Request: Please enter a valid comment' error message when the comment contains no body", () => {
    const newComment = {
      username: "butter_bridge",
      body: "",
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request: Please enter a valid comment");
      });
  });
  test("400: Responds with 'Bad request: Please enter a valid data type' error message when the comment body contains an incorrect date type", () => {
    const newComment = {
      username: "butter_bridge",
      body: 2,
    };
    return request(app)
      .post("/api/articles/1/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request: Please enter a valid data type");
      });
  });
  test("401 - should return an error message if the username does not exist in the users database", () => {
    const newComment = {
      username: "not_a_username",
      body: "a_test_comment",
    };
    return request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(400)
      .then(({ body: { msg } }) => {
        expect(msg).toBe("Bad Request: Username does not exist");
      });
  });
});
