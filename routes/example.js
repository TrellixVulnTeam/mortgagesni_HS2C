const express = require('express')
const router = express.Router();
const exampleController = require('../controllers/example');



//example Route

//Get the signup form
router.get('/example', exampleController.example);


module.exports = router;