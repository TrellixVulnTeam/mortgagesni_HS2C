const express = require('express')
const router = express.Router();
const home = require('../../controllers/home');



//Get the create a new post route
router.get("/", home.show)



module.exports = router;