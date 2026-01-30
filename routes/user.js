const express = require("express");
const router = express.Router();
const User = require("../models/user");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");



// SHOW SIGNUP FORM
router.get("/signup", (req, res) => {
  res.render("users/signup");
});

// HANDLE SIGNUP
router.post(
  "/signup",
  wrapAsync(async (req, res, next) => {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // auto-login after signup
    req.login(registeredUser, err => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  })
);



// SHOW LOGIN FORM
router.get("/login", (req, res) => {
  res.render("users/login");
});

// HANDLE LOGIN
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/listings");
  }
);

module.exports = router;
