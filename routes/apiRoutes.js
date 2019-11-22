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

  app.get("/api/drinksbyid", async(req, res) => {
    const cocktailId = req.body.cocktailId;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId);

    const drink = result.data.drinks[0];
    console.log(drink);
    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingredient1: drink.strIngredient1,
        ingredient2: drink.strIngredient2,
        ingredient3: drink.strIngredient3,
        ingredient4: drink.strIngredient4,
        ingredient5: drink.strIngredient5,
        ingredient6: drink.strIngredient6,
        ingredient7: drink.strIngredient7,
        ingredient8: drink.strIngredient8,
        ingredient9: drink.strIngredient9,
        ingredient10: drink.strIngredient10,
        ingredient11: drink.strIngredient11,
        ingredient12: drink.strIngredient12,
        ingredient13: drink.strIngredient13,
        ingredient14: drink.strIngredient14,
        ingredient15: drink.strIngredient15,
        measure1: drink.strMeasure1,
        measure2: drink.strMeasure2,
        measure3: drink.strMeasure3,
        measure4: drink.strMeasure4,
        measure5: drink.strMeasure5,
        measure6: drink.strMeasure6,
        measure7: drink.strMeasure7,
        measure8: drink.strMeasure8,
        measure9: drink.strMeasure9,
        measure10: drink.strMeasure1,
        measure11: drink.strMeasure11,
        measure12: drink.strMeasure12,
        measure13: drink.strMeasure13,
        measure14: drink.strMeasure14,
        measure15: drink.strMeasure15,
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

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
        ingredient1: drink.strIngredient1,
        ingredient2: drink.strIngredient2,
        ingredient3: drink.strIngredient3,
        ingredient4: drink.strIngredient4,
        ingredient5: drink.strIngredient5,
        ingredient6: drink.strIngredient6,
        ingredient7: drink.strIngredient7,
        ingredient8: drink.strIngredient8,
        ingredient9: drink.strIngredient9,
        ingredient10: drink.strIngredient10,
        ingredient11: drink.strIngredient11,
        ingredient12: drink.strIngredient12,
        ingredient13: drink.strIngredient13,
        ingredient14: drink.strIngredient14,
        ingredient15: drink.strIngredient15,
        measure1: drink.strMeasure1,
        measure2: drink.strMeasure2,
        measure3: drink.strMeasure3,
        measure4: drink.strMeasure4,
        measure5: drink.strMeasure5,
        measure6: drink.strMeasure6,
        measure7: drink.strMeasure7,
        measure8: drink.strMeasure8,
        measure9: drink.strMeasure9,
        measure10: drink.strMeasure1,
        measure11: drink.strMeasure11,
        measure12: drink.strMeasure12,
        measure13: drink.strMeasure13,
        measure14: drink.strMeasure14,
        measure15: drink.strMeasure15,
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
        ingredient1: drink.strIngredient1,
        ingredient2: drink.strIngredient2,
        ingredient3: drink.strIngredient3,
        ingredient4: drink.strIngredient4,
        ingredient5: drink.strIngredient5,
        ingredient6: drink.strIngredient6,
        ingredient7: drink.strIngredient7,
        ingredient8: drink.strIngredient8,
        ingredient9: drink.strIngredient9,
        ingredient10: drink.strIngredient10,
        ingredient11: drink.strIngredient11,
        ingredient12: drink.strIngredient12,
        ingredient13: drink.strIngredient13,
        ingredient14: drink.strIngredient14,
        ingredient15: drink.strIngredient15,
        measure1: drink.strMeasure1,
        measure2: drink.strMeasure2,
        measure3: drink.strMeasure3,
        measure4: drink.strMeasure4,
        measure5: drink.strMeasure5,
        measure6: drink.strMeasure6,
        measure7: drink.strMeasure7,
        measure8: drink.strMeasure8,
        measure9: drink.strMeasure9,
        measure10: drink.strMeasure1,
        measure11: drink.strMeasure11,
        measure12: drink.strMeasure12,
        measure13: drink.strMeasure13,
        measure14: drink.strMeasure14,
        measure15: drink.strMeasure15,
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