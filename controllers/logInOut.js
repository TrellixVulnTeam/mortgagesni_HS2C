const passport = require("passport");


//example route
exports.loginPage = (req, res, next) => {    
    const errors = req.flash("error") || [];
    res.render("auth/login", {errors: errors});
}

