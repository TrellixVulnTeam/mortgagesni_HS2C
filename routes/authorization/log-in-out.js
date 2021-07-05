const express = require('express');
const router = express.Router();
const logInOutController = require('../../controllers/logInOut');
const passport = require("passport");


//Render the login form
router.get("/login", logInOutController.loginPage);

//Post to the login Route
router.post("/login", passport.authenticate("local", {
    failureFlash: true,
    successRedirect: "/dashboard", 
    failureRedirect: "/login"}
    )), 

//Post to the login Route
router.post("/logout", function(req, res){
    req.logout();
    res.redirect("/login");
}), 







module.exports = router;

