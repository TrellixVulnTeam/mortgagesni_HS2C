const express = require('express')
const router = express.Router();
const authController = require('../../controllers/auth/auth.js');
const authControllerPassword = require('../../controllers/auth/passwordReset');
const { check } = require("express-validator/check")

//-----------------------------------------------
//Account Registration
//Get the signup form
router.get('/register', authController.registerGet);
//Post to the sgnup Route
router.post("/register", 
                //Validating Form Input
                check("email")
                .isEmail()
                .withMessage("e-mail entered is not valid"), 
                //Password
                check("password")
                .custom((password, {req}) => {
                    if(password !== req.body.passwordConfirm){
                       throw new Error("The passwords entered do not match")
                    }
                    return true;
                }),
                check("password")
                .custom((password, {req}) => {
                   if(password.length < 8){
                       console.log("here")
                       throw new Error("Your password is only " + password.length + " characters long we require a minimum of 8 characters")
                   }else if(password.length >= 20){
                    throw new Error("Your password is " + password.length + "characters long we only allow a maximum of 20 characters")                      
                   }

                   return true;
                }),

                //Passing to the controller for this route
                authController.registerPost)
//---------------------------------------------------


//----------------------------------------------------
//Account Confirmation via email
//Confirm email - after a new account is registered the user is directed to this page which simply provides info and tells them that they must click on the link that they will have received to confirm that account
router.get("/confirm-email", authController.confirmEmail);

//Confirm Email - this is the route that the user will hit when they click on the link that they received upon registration
router.get("/confirm/:username/:token", authController.confirmEmailHit)
//-----------------------------------------------------


//------------------------------------------------------
//Password Reset Logic
//Get Route to display the reset password form
router.get("/reset-password", authControllerPassword.getPage);

//This route receives the request to reset the password and generates a link which is sent to the clients email address the link contains the clients username and a code that has been added to the clients model
router.post("/reset-password", 
                    check("username")
                    .isEmail()
                    .withMessage("The email address entered is not valid"), 
                     authControllerPassword.postEmail);
//after the client has posted to the form above the email is sent and the client is redirected to a basic info page telling them that they have been sent an email with instructions 
router.get("/password-reset-check-email", authControllerPassword.checkEmail);

//Client will hit this route when they click on the email that they have received, if the credentials supplied from the link match the reset password code and it is within one hour the user will reach the secret page and can reset their passowrd 
router.get("/password-reset-link/:username/:token", authControllerPassword.resetSecretPage);

//The form on the secret page will post to this route and will complete the final password reset logic using passport
router.post("/password-reset-final-step", 
                                    check("newPassword")
                                    .custom((password, {req}) => {
                                    if(password.length < 8){
                                        throw new Error("Your password is only " + password.length + " characters long we require a minimum of 8 characters")
                                        }else if(password.length >= 20){
                                         throw new Error("Your password is " + password.length + "characters long we only allow a maximum of 20 characters")                      
                                        }
                     
                                        return true;
                                     }),
                                    authControllerPassword.resetFinalStep)
//------------------------------------------------------


module.exports = router;