require("dotenv").config();

// import express
var express = require("express");
// import express-handlebars
var exphbs = require("express-handlebars");
// import bodyparser
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

// import sequelize models
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// PASSPORT: imports passport and express-session used with passport
var passport = require("passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// PASSPORT: Middleware for Passport
app.use(
  session({
    secret: "wild and crazy guys",
    resave: true,
    saveUninitialized: true
  })
);

//Models
var models = require("./models");

// Routes
require("./routes/authRoutes")(app, passport); // PASSPORT: auth routes used with passport
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// PASSPORT: load passport strategies
require("./config/passport.js")(passport, models.users);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
