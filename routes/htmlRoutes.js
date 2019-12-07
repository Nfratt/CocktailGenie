/* eslint-disable prettier/prettier */
const db = require("../models");
const axios = require("axios");

const mapIng = drink => {
  const allIng = [];
  let index = 1;
  let curr, currMes;
  do {
    curr = `strIngredient${index}`;
    currMes = `strMeasure${index}`;
    allIng.push([drink[curr], drink[currMes]]);
    index++;
    console.log(drink[curr]);
  } while (drink[curr] !== null);
  return allIng;
};
module.exports = function(app) {
  //====================INDEX=============
  // Load index page
  app.get("/", async(req, res) => {
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
  //===================RANDOM==================
  // Load random page and get a random cocktail
  app.get("/random", async(req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/random.php"
      );
      //prints random cocktail JSON data to the console
      console.log(data);
      // const dbExample = await db.Example.findOne({
      //   where: { id: req.params.id }
      // });
      const { strDrink, strInstructions } = data.drinks[0];
      const ingMesObj = mapIng(data.drinks[0]);
      res.render("random", {
        cocktail: strDrink,
        instructions: strInstructions,
        ingMesObj
      });
      await db.Recipe.create({
        name: strDrink,
        instruction: strInstructions,
        ingMesObj: JSON.stringify(ingMesObj)
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  //====================SEARCH=========================
  // Load search page and pass in a cocktail ingredient
  app.get("/search", async(req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" +
                req.query.ingredient //of search bar
      );
      //prints JSON data of different drinks to the console
      console.log(data);
      //isolate first drink by ingredient in chosenIngredientID var
      var chosenIngredientId = data.drinks[0].idDrink;
      const nameFinder = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
                chosenIngredientId
      );
      // const dbExample = await db.Example.findOne({
      //   where: { id: req.params.id }
      // });
      const { strDrink, strInstructions } = nameFinder.data.drinks[0];
      const ingMesObj = mapIng(nameFinder.data.drinks[0]);
      res.render("search", {
        cocktail: strDrink,
        instructions: strInstructions,
        ingMesObj
      });
      await db.Recipe.create({
        name: strDrink,
        instruction: strInstructions,
        ingMesObj: JSON.stringify(ingMesObj)
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  //======================COCKTAIL=====================
  // Load search page and pass in a specific cocktail
  app.get("/cocktail", async(req, res) => {
    try {
      const { data } = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" +
                req.query.name //of search bar
      );

      //prints cocktail JSON data to the console
      //isolate first drink of array
      var chosenDrink = data.drinks[0].idDrink;
      // make that the only info returned to be Jqueried in
      console.log({ chosenDrink });
      //call function taking in data return const = function() which returns new restructured object
      //loop over data, extract whats needed, return object to be rendered

      const IdFinder = await axios.get(
        "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" +
                chosenDrink
      );
      const { strDrink, strInstructions } = IdFinder.data.drinks[0];
      const ingMesObj = mapIng(IdFinder.data.drinks[0]);

      res.render("cocktail", {
        cocktail: strDrink,
        instructions: strInstructions,
        ingMesObj
      });
      await db.Recipe.create({
        name: strDrink,
        instruction: strInstructions,
        ingMesObj: JSON.stringify(ingMesObj)
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  app.post("/cocktail", async(req, res) => {
    const email = req.body.email;
    console.log(res);
    await db.Users.create({
      username: email
    });
  });
  // Render 404 page for any unmatched routes
  app.get("*", async(req, res) => {
    res.render("404");
  });

};