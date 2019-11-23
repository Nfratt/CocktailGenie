var db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/", async (req, res) => {
    try {
      // const dbExamples = await db.Example.findAll({});
      res.render("index", {
        msg: "Welcome to CocktailGenie"
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
  app.get("/search", async (req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
          req.query.ingredient //of search bar
      );
      //prints JSON data of different drinks to the console
      console.log(data);
      //isolate first drink by ingredient
      var chosenIngredientId = data.drinks[0].idDrink;
      const nameFinder = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          chosenIngredientId
      );
      //www.thecocktaildb.com/api/json/v1/1/lookup.php?i=14978
      console.log(nameFinder.data);
      console.log(chosenIngredientId);
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

  app.get("/cocktail", async (req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
          req.query.name //of search bar
      );
      //prints random cocktail JSON data to the console
      //isolate first drink of array
      var chosenDrink = data.drinks[0].idDrink;
      // make that the only info returned to be Jqueried in
      //where do i go from here? gotta repeat calling process above)
      console.log({ chosenDrink });
      //call function taking in data return const = function() which returns new restructured object
      //loop over data, extract whats needed, return object to be rendered
      res.render("random", {
        example: { data }
      });
      const IdFinder = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
          chosenDrink
      );
      console.log(IdFinder);
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
