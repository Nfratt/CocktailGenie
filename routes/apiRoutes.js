/* eslint-disable prettier/prettier */
const db = require("../models");

const axios = require("axios");

const nodemailer = require("nodemailer");

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

module.exports = function (app) {

  app.get("/api/drinks", async (req, res) => {
    const results = await db.Recipe.findAll({});
    res.json(results);

    console.log(results);
  });

  app.get("/api/drinksbyid", async (req, res) => {
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

  app.post("/api/drinks", async (req, res) => {
    const cocktailId = req.body.cocktailId;
    const result = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + cocktailId);
    const drink = result.data.drinks[0];
    console.log(drink);
    const allIng = mapIng(drink);
    try {
      const result = await db.Recipe.create({
        name: drink.strDrink,
        instruction: drink.strInstructions,
        ingMesObj: JSON.stringify(allIng)

      });
      res.json(allIng);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });

  app.post("/api/drinksbyname", async (req, res) => {
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
      if (result === null) {
        return;
      }
      res.json(allIng);
      console.log(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }

  });
  // Create a new example
  app.post("/api/examples", async (req, res) => {
    try {
      const result = await db.Example.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Email recipe
  const transporter = nodemailer.createTransport({
    host: "mail.cocktailgenie.com",
    port: 587,
    secure: false,
    auth: {
      user: "mail@cocktailgenie.com",
      pass: "threewishes"
    },
    tls:{
      rejectUnauthorized:false
    }
  });
  const mailOptions = {
    from: "mail@cocktailgenie.com",
    to: "randomguy@gmail.com",
    subject: "Recipe from CocktailGenie",
    html: "<h3>Hi there [user]! Here is your drink recipe. <i>Bottoms up!</i></h3><br><h5>CocktailGenie: Helping bring out the master mixologist in you!</h5>"
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  // Delete an example by id
  app.delete("/api/drinks/:id", async (req, res) => {
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