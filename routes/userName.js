/* eslint-disable prettier/prettier */
const db = require("../models");

module.exports = function(app) {
  // Find all Authors and return them to the user with res.json
  app.get("/api/username", async(req, res) => {
    const results = await db.users.findAll({
      include: [db.post]
    });
    return res.json(results);
  });

  app.get("/api/username/:id", async(req, res) => {
    // Find one Author with the id in req.params.id and return them to the user with res.json
    const id = req.params.id;
    const findId = await db.users.findOne({
      where: { id: id }
    });
    return res.json(findId);
  });

  app.post("/api/username", async(req, res) => {
    // Create an Author with the data available to us in req.body
    const email = req.body.email;
    const results = await db.users.create({
      username: email
    });
    res.json(results);
  });

  app.delete("/api/username/:id", async(req, res) => {
    // Delete the Author with the id available to us in req.params.id
    const id = req.params.id;
    const results = await db.users.destory({
      where: { id: id }
    });
    res.json(results);
  });
};