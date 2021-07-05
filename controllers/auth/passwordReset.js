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


//Route Handlers
exports.getPage = (req, res, next) => {
    res.render("auth/password-reset", 
                                   {
                                    errorMessage: null,
                                    userFound: null,
                                    mes: null
                                   }
                                   )}


exports.postEmail = (req, res, next) => {

    const username = req.body.username;

    User.findOne({username: username}, function(err, foundUser){
        if(err){
            console.log(err)
        }else if(!foundUser){
            const message = "We cannot find a user with " + username + "as their email address if you have miss typed your email address please try again alternatively click the create account link below to register a new account";
            return res.render("auth/password-reset", {
                errorMessage: "",
                body: req.body,
                userFound: message,
                mes: "dddd"
              }); //422 is an error status code  
        } else {

            //Check for additional errors generated in the middleware they will be collected here 
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return res.status(422).render("auth/password-reset", {
                                                errorMessage: errors.array(),
                                                body: req.body
                }); //422 is an error status code
            }

            User.findOne({username: username})
            .then(foundUser => {
               //Generate Random token and email to the user
               crypto.randomBytes(32, (err, buffer) => {
                if(err){
                    return res.redirect("/reset");
                }
                const token = buffer.toString('hex');
        
                transporter.sendMail({
                    to: foundUser.username,
                    from: 'info@mortgagesnorthernireland.com',
                    subject: 'Reset Password',
                    html: `<div><a href="http://localhost:5000/password-reset-link/${foundUser.username}/${token}">Click here to Reset your password</a></div>`
                });
                    //Save the token to the users account
                    foundUser.passwordResetToken = token;
                    foundUser.passwordResetTime = new Date(); 
                    return foundUser.save();
                 });
            })
            .then(foundUser => {
                return res.render("auth/password-reset-check-email");
            })
            .catch(err => {
                if(err){
                    console.log(err);
                }
            })

        }


    


})}




exports.checkEmail = (req, res, next) => {
    res.render("auth/password-reset-check-email")
}

exports.resetSecretPage = (req, res, next) => {
    User.findOne({username: req.params.username})
    .then(foundUser => {

        if(foundUser.passwordResetToken === req.params.token){
            
            return foundUser;
        }
        return res.redirect("/reset-password")
    })
    .then(foundUser => {

        const originalTime = Date.parse(foundUser.passwordResetTime);
        const timeNow = Date.parse(new Date());
        const lapsedTimeMilliseconds = timeNow - originalTime;
        const oneHour = 3600000;

        if( ( oneHour - lapsedTimeMilliseconds ) < 0){
            
            return res.render("auth/password-reset", {
                username: foundUser.username,
                errorMessage: null,
                userFound: "You must reset your password within one hour of receiving the password reset link. Enter your email address below and reset your password within 1 hour by clicking the link you will receive via email."
            })
        }
            return res.render("auth/password-reset-sec", {
                                                    username: foundUser.username,
                                                    errorMessage: null,
                                                    userFound: null
                                                    })
    })
    .catch(err => {
        if(err){
            console.log(err);
        }
    })
}


exports.resetFinalStep = (req, res, next) => {
    const newPassword = req.body.newPassword;
    const newPasswordConfirm = req.body.newPasswordConfirm;
    const username = req.body.username;
    const errors = validationResult(req);

    if(newPassword !== newPasswordConfirm){
        return res.render("auth/password-reset-sec", {
            userFound: "The passwords entered do not match",
            username: username,
            errorMessage: null
        })
    } else if (!errors.isEmpty()){
        //Check for additional errors generated in the middleware they will be collected here 
        return res.status(422).render("auth/password-reset-sec", {
                                        errorMessage: errors.array(),
                                        body: req.body,
                                        username: req.body.username,
                                        userFound: null
        }); //422 is an error status code
    }else{
        User.findOne({username: username})
        .then(foundUser => {
    
            foundUser.setPassword(newPassword, function(){
                foundUser.save();
            })

            return foundUser;
         })
        .then(foundUser => {
            return req.login(foundUser, function(err){
                if(err){
                    console.log(err)
                }
            });
        })
        .then(foundUser => {
           return res.render("dashboard/dashboard", {
               message: "Your password has been reset, welcome to ?????????"
           })
        })
        .catch(err => {
            console.log(err)
        })
    }
    }




