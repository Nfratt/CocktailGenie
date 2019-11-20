const db = require("../models");
const axios = require("axios");

module.exports = function(app) {
  // Search by ingredient for one randomly chosen drink
  app.get("/api/drinks", async (req, res) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=" + "Gin")
      .then(response => {
        const searchData = response.data;
        res.json(searchData);
      })
      .catch(err => {
        console.log(err);
      });
  });

  // Lookup a completely random drink
  app.get("/api/drinks/random", async (req, res) => {
    axios
      .get("https://www.thecocktaildb.com/api/json/v1/1/random.php")
      .then(response => {
        const searchData = response.data;
        res.json(searchData);
      })
      .catch(err => {
        console.log(err);
      });
  });
};
