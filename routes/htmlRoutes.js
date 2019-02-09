var db = require("../models");
var financialsData = require('../public/js/financials');



module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      let logout = false;
      if (req.user) {
        logout = true;
      }
      res.render("index", {
        msg: "Welcome!",
        dbUsers: dbUsers
      });
    });
  });

  app.get("/newuser", function(req, res) {
    db.Users.findAll({}).then(function(dbUsers) {
      res.render("newuser", {
        dbUsers: dbUsers
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    financialsData(req.params.id, function(data) {
      res.render("financials", data);
    }); 
   
  });

    

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

}
