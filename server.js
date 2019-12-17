// Setting up dependencies for server to use

const express = require("express");
const path = require("path");

// Sets up the Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Requiring our models
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
require("./routes/api-routes")(app);
require("./routes/html-routes")(app);

// Syncing our sequelize models and then starting our Express app
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(`Listening on localhost:${PORT}`);
  });
});
