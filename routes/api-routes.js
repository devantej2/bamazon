// Dependencies

var db = require("../models");

// Routes

module.exports = function(app) {
  // Route to get all products
  app.get("/api/products", function(req, res) {
    db.Product.findAll().then(function(dbBamazon) {
      res.json(dbBamazon);
    });
  });

  //Updating the stock quantity for the appropriate id
  app.put("/api/products", function(req, res) {
    db.Product.update(
      { stock_quantity: req.body.stock_quantity },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(function(results) {
        res.json(results);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
};
