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
    const allIng = mapIng(drink);
    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingMesObj: JSON.stringify(allIng),
      });
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });

  app.post("/api/drinks", async(req, res) => {
    const cocktailId = req.body.cocktailId;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId);
    const drink = result.data.drinks[0];
    console.log(drink);
    const allIng = mapIng(drink);
    try {
      await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingMesObj: JSON.stringify(allIng)

      });
      res.json(allIng);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });

  app.post("/api/drinksbyname", async(req, res) => {
    const cocktailName = req.body.cocktailName;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + cocktailName);
    const drink = result.data.drinks[0];
    const allIng = mapIng(drink);

    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingMesObj: JSON.stringify(allIng)
      });
      res.json(allIng);
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