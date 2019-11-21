
/* eslint-disable prettier/prettier */
const db = require("../models");

const axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/drinks", async(req, res) => {
    const results = await db.Recipe.findAll({});
    res.json(results);
    console.log(results);
  });

  app.post("/api/drinksbyid", async(req, res) => {
    const cocktailId = req.body.cocktailId;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId);

    const drink = result.data.drinks[0];
    console.log(drink);
    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingredients: drink.strIngredient1,
        ingredients2: drink.strIngredient2
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });

  app.post("/api/drinksbyname", async(req, res) => {
    const cocktailName = req.body.cocktailName;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName);

    const drink = result.data.drinks[0];
    console.log(drink);
    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingredients1: drink.strIngredient1,
        ingredients2: drink.strIngredient2
      });
      res.json(result);
      console.log(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });
  // Create a new example
  app.post("/api/examples", async(req, res) => {
    try {
      const result = await db.Example.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Delete an example by id
  app.delete("/api/drinks/:id", async(req, res) => {
    try {
      const deleteId = req.params.id;
      const result = await db.Recipe.destroy({ where: { id: deleteId } });
      const deletedRowCount = result;
      const status = deletedRowCount > 0 ? 200 : 404;
      res.status(status).json({ deletedRowCount });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });
};