const express = require('express');
const adminController = require('../Controller/adminController');
const { isAdmin, isAuthenticated } = require('../utils/isAuth');
const router = express.Router();

router.post('/create/mess',isAuthenticated,isAdmin,adminController.createMess);
router.post('/create/food/:id',isAuthenticated,isAdmin,adminController.createFood);

module.exports = router;