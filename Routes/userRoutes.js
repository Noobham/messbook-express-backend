var express = require('express');
const userModel = require('../Model/userModel');
const userController = require("../Controller/userController");
const { isAuthenticated } = require('../utils/isAuth');
var router = express.Router();

router.post('/signUp',userController.createUser);
router.post('/login',userController.loginUser);
router.get('/me',isAuthenticated,userController.getUserDetails);

router.get('/mess',isAuthenticated,userController.getMessList)
router.get('/mess/:id',isAuthenticated,userController.getFoodList);



module.exports = router;










