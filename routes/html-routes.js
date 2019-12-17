// Requiring Dependencies
const path = require("path");
const db = require("../models");

// Routes

module.exports = function(app) {
  // index route to load home page
  app.get("/", function(req, res) {
    db.Product.findAll()
      .then(function(results) {
        res.status(200).send(results);
      })
      .catch(function(err) {
        res.status(500).send({
          error: "Could not return products"
        });
      });
  });
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "./public/index.html"));
  });
};
