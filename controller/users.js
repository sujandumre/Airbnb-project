const User = require("../models/user");

module.exports.signupForm= (req, res) => {
  res.render("users/signup");
}

module.exports.signup= async (req, res, next) => {
    const { username, email, password } = req.body;

    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // auto-login after signup
    req.login(registeredUser, err => {
      if (err) return next(err);

      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listings");
    });
  }

  module.exports.loginForm= (req, res) => {
  res.render("users/login");
};

module.exports.login= async(req, res) => {
    req.flash("success", "Welcome back!");
    let redirectUrl= res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
  };

module.exports.logout=(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
    req.flash('success','you logout successfully!');
    res.redirect('/listings');
  });
};