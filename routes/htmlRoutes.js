var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      // PASSPORT: checks to see if the user is logged in.  If so then render conditional handlebars via logout render true/false
      let logout = false;
      if (req.user) {
        logout = true;
      }
      res.render("index", {
        msg: "Welcome!",
        // PASSPORT: logout will be true or false if user is logged in
        logout: logout,
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
