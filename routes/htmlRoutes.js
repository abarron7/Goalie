var db = require("../models");
var financialsData = require('../public/js/financials');
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));

  



  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(usersData) {
      let logout = false;
      if (req.user) {
        logout = true;
      }
      res.render("index", {
        // msg: "Welcome!",
        usersData: usersData
      });
    });
  });

  app.get("/newuser", function(req, res) {
    db.Users.findAll({}).then(function(usersData) {
      res.render("newuser", {
        usersData: usersData
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    console.log("~~Running get user request~~");
    if (req.params.id != "POST") {
      financialsData(req.params.id, function(userDetails) {
        res.render("financials", userDetails);
      });
    }
  });

    

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

});
}

