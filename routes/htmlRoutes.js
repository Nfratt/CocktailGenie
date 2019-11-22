var db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/", async (req, res) => {
    try {
      // const dbExamples = await db.Example.findAll({});
      res.render("index", {
        msg: "What drink will we make today?"
        // examples: dbExamples
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Load random page and get a random cocktail
  app.get("/random", async (req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      //prints random cocktail JSON data to the console
      console.log(data);
      // const dbExample = await db.Example.findOne({
      //   where: { id: req.params.id }
      // });
      res.render("random", {
        example: { data }
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Load search page and pass in a cocktail ingredient
  app.get(
    "/search/:id", //address this
    async (req, res) => {
      try {
        const dbExample = await db.Example.findOne({
          where: { id: req.params.id }
        });
        res.render("search", {
          example: dbExample
        });
      } catch (error) {
        res
          .status(400)
          .render("400", { error: { name: error.name, msg: error.message } });
      }
    }
  );

  app.get("/cocktail", async (req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          req.query.name //of search bar
      );
      //prints random cocktail JSON data to the console
      console.log(data);
      // const dbExample = await db.Example.findOne({
      //   where: { id: req.params.id }
      // });
      res.render("random", {
        example: { data }
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  // Render 404 page for any unmatched routes
  app.get("*", async (req, res) => {
    res.render("404");
  });
};

// module.exports = { data };
