var bCrypt = require("bcrypt-nodejs");
//We will need the models folder to check passport against
var db = require("../models");

// PASSPORT: No need to edit this file unless you want to change from email login to username login
module.exports = function(passport) {
  var LocalStrategy = require("passport-local").Strategy;

  //we import passport packages required for authentication
  var passport = require("passport");

  passport.serializeUser(function(user, done) {
    console.log("user id =", user.id);
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.findByPk(id).then(function(user) {
      // findByPk is the new way to write findById in sequelize
      if (user) {
        done(null, user.get());
      } else {
        done(user.errors, null);
      }
    });
  });

  // Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
  passport.use(
    "local-signup",
    new LocalStrategy(
      // Our user will sign in using an email, rather than a "username"
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
        usernameField: "email"
      },

      function(req, email, password, done) {
        var generateHash = function(password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };
        db.User.findOne({
          where: {
            email: email
          }
        }).then(function(Users) {
          // If there's no user with the given email
          if (!Users) {
            return done(null, false, {
              message: "That email is already taken"
            });
          } else {
            var userPassword = generateHash(password);
            var data = {
              email: email,
              password: userPassword,
              firstname: req.body.firstname,
              lastname: req.body.lastname
            };

            db.User.create(data).then(function(newUser) {
              if (!newUser) {
                return done(null, false);
              }

              if (newUser) {
                return done(null, newUser);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        // by default local strategy uses username and password but we'll override it with email instead
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true // allows us to pass back the entire request to the callback
      },
      function(req, email, password, done) {
        // const User = user;
        var isValidPassword = function(userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };
        db.User.findOne({
          where: {
            email: email
          }
        })
          .then(function(user) {
            if (!user) {
              return done(null, false, {
                message: "Email does not exist"
              });
            }
            if (!isValidPassword(user.password, password)) {
              return done(null, false, {
                message: "Incorrect Password."
              });
            }
            var userinfo = user.get();
            return done(null, userinfo);
          })
          .catch(function(err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin"
            });
          });
      }
    )
  );

  // In order to help keep authentication state across HTTP requests,
  // Sequelize needs to serialize and deserialize the user
  // Just consider this part boilerplate needed to make it all work
  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });
  passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
  });
};
