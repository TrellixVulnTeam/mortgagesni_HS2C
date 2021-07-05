const express = require('express')
const router = express.Router();
const dashController = require('../../controllers/dashboard');
const isLoggedIn = require("../../middleware/isLoggedIn");


//Get the signup form
router.get('/dashboard', isLoggedIn,  dashController.dashboard);


module.exports = router;