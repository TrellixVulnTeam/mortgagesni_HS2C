//Import any required schemas 
const User = require("../../models/user");
const crypto = require("crypto");
const {validationResult} = require("express-validator/check");

//Mailing
const nodemailer = require('nodemailer');
const sendGridTransport = require("nodemailer-sendgrid-transport");
const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}))


//Show the user registration form
exports.registerGet = (req, res, next) => {
    res.render("auth/register",{
                    errorMessage: null,
                    userFound: null
    });
};

//Post to the User Registration Route
exports.registerPost = (req, res, next) => {
    //Check to see if a user with that email address already exists
    User.findOne({username: req.body.email}, function(err, foundUser){
        if(err){
            console.log(err)
        }else if(foundUser){
           return res.status(422).render("auth/register", {
               userFound: "A user with that email address already exists",
               errorMessage: null
           })
        }
    })
    //Check for additional errors generated in the middleware they will be collected here 
    const errors = validationResult(req);
    console.log(errors);
    if(!errors.isEmpty()){
        return res.status(422).render("auth/register", {
                                        errorMessage: errors.array(),
                                        body: req.body
        }); //422 is an error status code
    }

    //Providing the user passes the checks above they will be allowed to register a new account 
     User.register({username: req.body.email}, req.body.password)
    .then(newAccount => {

        //Generate random acc token
           crypto.randomBytes(32, (err, buffer) => {
            if(err){
                return res.redirect("/register")
            }
            const token = buffer.toString("hex")
            console.log("-----------------")
            console.log(token)
            console.log(typeof token)
            newAccount.accConfirmedCode = token;
            newAccount.accConfirmed = false;
            newAccount.save();

            transporter.sendMail({
                to: newAccount.username,
                from: 'info@mortgagesnorthernireland.com',
                subject: 'New Sign Up',
                html: `<div><a href="http://localhost:5000/confirm/${newAccount.username}/${token}">Click here to confirm your account</a></div>`
            });
        })

       })
       .then(result => {
           res.render("auth/confirm-email", {email: req.body.username});
       })
       .catch(err => {
           res.redirect("/register");
       })
}


//Confirm email Route
exports.confirmEmail = (req, res, next) => {
    res.render("auth/confirm-email")
}

//Confirm email route to be hit when the user clicks the link that they received upon registration
exports.confirmEmailHit = (req, res, next) => {
    const username = req.params.username;
    const accConfirmedCode = req.params.token;

    User.findOne({username: username})
    .then(foundUser => {
        if(foundUser.accConfirmedCode === accConfirmedCode){
            foundUser.accConfirmedCode = "";
            foundUser.accConfirmed = true;
            foundUser.save();
            return foundUser;
        }else{
            //We will need to add some logic here to allow the user to reset their accConfirmedCode
        }
    }).then(foundUser => {
        req.logIn(foundUser, function(err){
            if(err){
                console.log(err)
            }else{
                res.redirect("/dashboard");
            }
        })
    })
    .catch(err => {
        console.log(err);
    })
}



